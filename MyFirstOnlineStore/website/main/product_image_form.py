""" Image Shape control module

    Note:
        This module contains auxiliary classes
            Classes:
                ImageInput
                ImageAllowed
                ImageField
"""

from flask_wtf.file import FileAllowed
from markupsafe import Markup
from werkzeug.datastructures import FileStorage 
from wtforms.widgets import FileInput, NumberInput
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField


__all__ = ['ProductItemForm']

class ImageInput(FileInput):
    def __call__(self, field, **kwargs):
        kwargs.setdefault('id', field.id)
        kwargs.setdefault('type', self.input_type)
        flags = getattr(field, 'flags', {})
        for k in dir(flags):
            if k in self.validation_attrs and k not in kwargs:
                kwargs[k] = getattr(flags, k)

        classes = ['image-input']
        loaded = field.data and not isinstance(field.data, FileStorage)
        if loaded:
            classes.append('loaded')
        classes_str = ' '.join(classes)
        html = f'<div class="{classes_str}">'
        html += '<input %s>' % self.html_params(name=field.name, **kwargs)
        if loaded:
            html += f'<img src="{field.data.url}">'
        else:
            html += '<img>'
        html += '</div>'
        return Markup(html)


class ImageAllowed(FileAllowed):


    def __init__(self, upload_set=('jpg', 'jpeg', 'png'), message=None):
        super().__init__(upload_set, message)
        mime_types = []
        for allowed_type in upload_set:
            if allowed_type.startswith('image/'):
                mime_type = allowed_type
            else:
                mime_type = f'image/{allowed_type}'
            mime_types.append(mime_type)
        self.field_flags = {'accept': ', '.join(mime_types)}
        
        
        

    
    
class ImageField(FileField):
    widget = ImageInput()

    def __init__(self, label=None, validators=None, *args, **kwargs):
        if not validators:
            validators = [ImageAllowed()]
        elif not any(isinstance(i, ImageAllowed) for i in validators):
            validators += [ImageAllowed()]
        super().__init__(label, validators, *args, **kwargs)



class ProductItemForm(FlaskForm):  
    image = ImageField(validators=[ImageAllowed(['jpeg', 'jpg'])])
    
    category = StringField('Категория товара', validators=[DataRequired(), Length(max=10)])
    title = StringField('Наименование товара', validators=[DataRequired(), Length(max=15) ])
    discount = IntegerField(widget=NumberInput())
    price = IntegerField(widget=NumberInput(), validators=[DataRequired()])
    submit = SubmitField('Загрузить')


    