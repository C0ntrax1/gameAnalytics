from django.http.response import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from django.db.models import F
from . import models
from . import serializers
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def login(request):
    data = JSONParser().parse(request)
    if "userid" in data:
        userid = data["userid"]
        entry_exists = models.Entry.objects.filter(userid=userid).exists()
        if entry_exists:
            response_data = {"userid": userid}
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {"message": f"User ID not registered."}
            return JsonResponse(response_data, status=status.HTTP_200_OK)
    else:
        response_data = {"message": "User ID not registered."}
        return JsonResponse(response_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def add_entry(request):
    serializer = serializers.EntrySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


XY_VALUES = {
    "A": {
        "x": 1,
        "y": 1,
    },
    "B": {
        "x": -1,
        "y": 1,
    },
    "C": {
        "x": -1,
        "y": -1,
    },
    "D": {
        "x": 1,
        "y": -1,
    },
}


def evaluateLvlAverage(results=[]):
    # Create a dictionary to store averages for each Lvl
    averages = {}

    # Calculate the average X and Y values for each Lvl
    for result in results:
        lvl = result.get("lvl")
        value_list = result.get("value", [])
        total_x = 0
        total_y = 0
        count = 0

        for letter in value_list:
            xy_data = XY_VALUES.get(letter, None)
            if xy_data:
                total_x += xy_data["x"]
                total_y += xy_data["y"]
                count += 1

        if count > 0:
            average_x = total_x / count
            average_y = total_y / count
        else:
            average_x = 0
            average_y = 0

        if lvl not in averages:
            averages[lvl] = {"count": 0, "total_x": 0, "total_y": 0}

        averages[lvl]["count"] += 1
        averages[lvl]["total_x"] += average_x
        averages[lvl]["total_y"] += average_y

    # Calculate the final averages for each Lvl
    final_averages = []
    for lvl, data in averages.items():
        average_x = data["total_x"] / data["count"] if data["count"] > 0 else None
        average_y = data["total_y"] / data["count"] if data["count"] > 0 else None
        final_averages.append({"label": f"{lvl}", "x": average_x, "y": average_y})

    return final_averages


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def points(request, pk=None):
    if pk is None:
        response_data = {"message": "User ID not given."}
        return JsonResponse(response_data, status=status.HTTP_200_OK)

    entries = models.Entry.objects.filter(userid=int(pk))
    results = serializers.ViewEntrySerializer(entries, many=True).data

    return JsonResponse(
        evaluateLvlAverage(results), status=status.HTTP_200_OK, safe=False
    )


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def get_points(request):
    entries = models.Entry.objects.all()
    serializer = serializers.ViewEntrySerializer(entries, many=True)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def heatmap(request):
    unique_userids = models.Entry.objects.values("userid").distinct()
    users = [entry["userid"] for entry in unique_userids]
    heatmap_data = []

    for user in users:
        entries = models.Entry.objects.filter(userid=user)
        results = serializers.ViewEntrySerializer(entries, many=True).data
        user_avg = evaluateLvlAverage(results)
        final_avg_x = round(sum(avg["x"] for avg in user_avg) / len(user_avg), 3)
        final_avg_y = round(sum(avg["y"] for avg in user_avg) / len(user_avg), 3)
        heatmap_data.append(
            {"value": "test", "user_id": user, "x": final_avg_x, "y": final_avg_y}
        )
    return JsonResponse(heatmap_data, status=status.HTTP_200_OK, safe=False)
