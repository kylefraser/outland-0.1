import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../../queries';
import { styled } from '../../../stitches.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '../Text';

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.25rem',
  height: '100%',
  borderWidth: 2,
  borderRadius: 4,
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  textAlign: 'center',
  fontFamily: "'Outfit', sans-serif",
});

const thumbsContainer = {
  display: 'flex',
  marginTop: '1rem',
};

const thumbStyle = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: '0.5rem',
  marginRight: '0.5rem',
  width: 100,
  height: 100,
  padding: '0.25rem',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const errorStyle = {
  color: '#c45e5e',
  fontSize: '0.75rem',
};

const Upload = ({
  label,
  style,
  register,
  required,
  setCoverPhoto,
  setFilePath,
  setBlob,
  setImageId,
  currentPhoto,
}: any) => {
  const [preview, setPreview] = useState<any>();
  const [errors, setErrors] = useState<any>();
  const [uploadFile, { data }] = useMutation(UPLOAD_FILE);
  const onDrop = useCallback(
    async ([file]: any) => {
      if (file) {
        setPreview(URL.createObjectURL(file));

        if (setCoverPhoto) {
          setCoverPhoto(file);
        }

        if (setBlob) {
          setBlob(URL.createObjectURL(file));
        }

        uploadFile({
          variables: {
            name: file.name,
            type: file.type,
            size: file.size,
            path: file.path,
          },
        });
      } else {
        setErrors('Something went wrong. Check file type and size (max. 1 MB)');
      }
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxSize: 1024000,
  });

  useEffect(() => {
    if (setFilePath) {
      setFilePath(data?.uploadFile?.path);
      setImageId(data?.uploadFile?.imageId);
    }
  }, [data?.uploadFile?.path]);

  let registered = register && { ...register('cover_photo', { required }) };

  const thumb = (
    <div style={thumbStyle}>
      <div style={thumbInner}>
        <img src={preview} style={img} />
      </div>
    </div>
  );

  return (
    <div style={style}>
      <Label as={'h5'} size={'5'}>
        {label}
      </Label>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {currentPhoto ? (
              <img src={currentPhoto} style={{ height: '100%' }} />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
                />
                <p>Drop file here, or click to select the file</p>
              </>
            )}
          </div>
        )}
        {preview && <aside style={thumbsContainer}>{thumb}</aside>}
        {errors && <span style={errorStyle}>{errors}</span>}
        {data && data.uploadFile && (
          <input
            type="hidden"
            name="cover_photo"
            value={data.uploadFile.path}
            {...registered}
          />
        )}
      </Container>
    </div>
  );
};

export default Upload;

const Label = styled(Text, {
  fontWeight: 500,
  marginBottom: '0.25rem',
});
