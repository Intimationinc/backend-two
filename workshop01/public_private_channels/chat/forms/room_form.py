from django import forms


class RoomForm(forms.Form):
    name = forms.CharField(max_length=150)
    room_name = forms.CharField(min_length=10, max_length=100)
    password = forms.CharField(min_length=12, max_length=30)
