import mainImage from '../../shared/templates/profile_1.png';
export function TeacherImage({ src, ...props }) {
  return (
    <img
      src={src || mainImage}
      alt="Teacher's profile"
      style={{ display: 'flex', width:'373px', height: '264px', borderRadius: '0px', alignSelf: 'stretch'}}
    />
  );
}
