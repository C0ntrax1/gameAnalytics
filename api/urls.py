from django.urls import path, re_path
from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("add-entry", views.add_entry, name="add-entry"),
    path("add-entry/", views.add_entry, name="add-entry"),
    path("points", views.points, name="points"),
    path("get_points", views.get_points, name="get_points"),
    re_path(r"^points/(?P<pk>[0-9]+)$", views.points),
    path("heatmap", views.heatmap, name="heatmap"),
]
