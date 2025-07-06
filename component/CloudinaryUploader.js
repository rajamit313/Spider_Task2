'use client';
import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({ onUpload }) => {
  return (
    <div>
      <CldUploadButton
        uploadPreset={cloudPresetName}
        options={{ multiple: false }}
        onSuccess={(result) => {
          const url = result?.info?.secure_url;
          if (url) {
            onUpload(url);
          }
        }}
      >
        <span>
          <lord-icon
            src="https://cdn.lordicon.com/vgklyksb.json"
            trigger="hover"
            colors="primary:#e88c30,secondary:#c7c116"
            style={{ width: '35px', height: '35px' }}
          ></lord-icon>
        </span>
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;
