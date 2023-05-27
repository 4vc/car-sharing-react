import PropTypes from 'prop-types';

const Image = ({imageBytes}) => {
  let imageDataUrl;

  if (Array.isArray(imageBytes)) {
    imageDataUrl = `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, imageBytes)
    )}`;
  } else if (typeof imageBytes === 'string') {
    imageDataUrl = `data:image/jpeg;base64,${imageBytes}`;
  } else {
    return null;
  }

  return (
    <div>
      <img src={imageDataUrl} alt='Image' width='195px'/>
    </div>
  );
};

Image.propTypes = {
  imageBytes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number.isRequired),
    PropTypes.string.isRequired,
  ]).isRequired,
};

export default Image;
