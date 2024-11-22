from django import forms


class ConversationForm(forms.Form):
    message = forms.CharField(max_length=500)
