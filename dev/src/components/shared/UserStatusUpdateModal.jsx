import { Button, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';

function UserStatusUpdateModal({ statusUpdateModal, setStatusUpdateModal, setFetchAgain }) {
  const [isSubscribed, setIsSubscribed] = useState([
    { value: true, label: 'Abonné(e)', disabled: false },
    { value: false, label: 'Désabonné(e)', disabled: false }
  ]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (statusUpdateModal?.status === true) {
      setIsSubscribed([
        { value: true, label: 'Abonné(e)', disabled: true },
        { value: false, label: 'Désabonné(e)', disabled: false }
      ]);
    } else if (statusUpdateModal?.status === false) {
      setIsSubscribed([
        { value: true, label: 'Abonné(e)', disabled: false },
        { value: false, label: 'Désabonné(e)', disabled: true }
      ]);
    }
  }, [statusUpdateModal]);

  const handleUpdateStatus = () => {
    if (status === null) {
      notificationWithIcon('error', 'ERROR', 'Please select a status first to update user subscription status');
    } else {
      setLoading(true);
      const updateData = {
        isSubscribed: status
      };
      ApiService.put(
        `/user/${statusUpdateModal?.id}`,
        updateData
      )
        .then((res) => {
          setLoading(false);
          if (res?.result_code === 0) {
            notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'User subscription status update successful');
            setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }));
            setFetchAgain((prevState) => !prevState);
          } else {
            notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
          }
        })
        .catch((err) => {
          setLoading(false);
          notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
        });
    }
  };

  return (
    <Modal
      title='Update User Subscription Status:'
      open={statusUpdateModal?.open}
      onOk={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
      onCancel={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
      footer={[
        <Button
          onClick={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
          key='back'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleUpdateStatus}
          type='primary'
          key='submit'
          disabled={loading || status === null}
          loading={loading}
        >
          Ok
        </Button>
      ]}
    >
      <Select
        className='w-full my-5'
        placeholder='-- select subscription status --'
        optionFilterProp='children'
        options={isSubscribed}
        size='large'
        allowClear
        value={status}
        onChange={(value) => setStatus(value)}
      />
    </Modal>
  );
}

export default UserStatusUpdateModal;
