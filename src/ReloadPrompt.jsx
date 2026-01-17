import React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="pwa-toast">
      {(offlineReady || needRefresh) && (
        <div className="toast-message">
          <span>
            {offlineReady
              ? "Ứng dụng đã sẵn sàng chạy Offline!"
              : "Thầy/Cô vừa cập nhật bài học mới!"}
          </span>
          {needRefresh && (
            <button onClick={() => updateServiceWorker(true)}>
              Cập nhật ngay
            </button>
          )}
          <button onClick={close}>Đóng</button>
        </div>
      )}
    </div>
  );
}

export default ReloadPrompt;