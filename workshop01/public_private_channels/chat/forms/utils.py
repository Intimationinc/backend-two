from django import forms


def get_form_errors(form: forms.ModelForm | forms.Form) -> list[str]:
    error_list = []
    for title, errors in form.errors.items():
        title = " ".join([word.title() for word in title.split("_")])
        for error in errors:
            error_list.append(f"{title}: {error}")

    return error_list
