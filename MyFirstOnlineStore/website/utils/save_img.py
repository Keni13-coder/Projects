import os
import secrets
from PIL import Image


def save_image(form_image):
    """ Function for getting the path to the image

    Args:
        form_image (form.data): transmitted data via FileField
        
    Attributes
    ----------
    path: str
    hex_: str
    f_ext: str
    img_fn: str
    last_paht: str
    i: PIL.Image
    
    Returns:
        str: the path to the image
    """
    
    path_ = 'D:\Repository\sart_flask\\trial_run\website\static\image\product\\test_img'
    hex_ = secrets.token_hex(16)
    _, f_ext = os.path.splitext(form_image.filename)
    img_fn = hex_ + f_ext
    last_path = os.path.join(path_, img_fn )
    
    i = Image.open(form_image)
    i.save(last_path)
    
    return 'image/product/test_img/' + img_fn  
