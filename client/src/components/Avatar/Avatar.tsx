import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../Modal';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { Upload } from '../Upload';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../../queries';
import { Toast } from '../Toast';

const Avatar = ({ url }: any) => {
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [showIcon, setShowIcon] = useState<any>(false);
  const [avatarPhoto, setAvatarPhoto] = useState<any>();
  const [filePath, setFilePath] = useState<any>();
  const [imageId, setImageId] = useState<any>();
  const [blob, setBlob] = useState<any>(false);
  const [visible, setVisible] = useState<any>(false);

  const [editUser] = useMutation(EDIT_USER, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      setModalOpen(false);
      setVisible(true);
    },
    update(cache, { data: { editUser } }) {
      cache.modify({
        fields: {
          me: (item) => {
            return { ...item, avatar: editUser.avatar };
          },
        },
        optimistic: true,
      });
    },
  });

  function mouseOver() {
    setShowIcon(!showIcon);
  }

  useEffect(() => {
    if (filePath) {
      fetch(filePath, {
        body: avatarPhoto,
        mode: 'cors',
        method: 'PUT',
        headers: {
          'x-amz-acl': 'public-read',
        },
      });

      localStorage.setItem('outland-avatar', imageId);

      editUser({
        variables: {
          avatar: imageId && 'https://cdn.gooutland.com/' + imageId,
        },
      });
    }
  });

  return (
    <>
      {visible && <Toast type={'success'}>Avatar has been changed.</Toast>}
      <div
        style={{
          backgroundImage: blob
            ? `url(` + blob + `)`
            : url
            ? `url(` + url + `)`
            : '',
          backgroundSize: '100%',
          borderRadius: '9999px',
          backgroundColor: '#f0f0f0',
          width: '6rem',
          height: '6rem',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => mouseOver()}
        onMouseLeave={() => mouseOver()}
      >
        {(!url && !blob) ||
          (showIcon && (
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: '#eaeaea',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faCamera} />
            </div>
          ))}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 360,
          width: 360,
          minHeight: 400,
        }}
      >
        <Upload
          style={{ flex: '1', display: 'flex', flexDirection: 'column' }}
          label="Upload new photo"
          setFilePath={setFilePath}
          setCoverPhoto={setAvatarPhoto}
          setBlob={setBlob}
          setImageId={setImageId}
        ></Upload>
      </Modal>
    </>
  );
};

export default Avatar;
