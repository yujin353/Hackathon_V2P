import React, { useEffect, useState } from 'react';
import { Modal, CollisionWarning } from "../../component";
import init, { UrbrFront } from '../LSTM/pkg/urbr_wasm.js';
import { get } from 'jquery';
import { set } from 'react-ga';

const MainMap = () => {
  const [urbrFront, setUrbrFront] = useState(null);
  const [numParameters, setNumParameters] = useState(null);
  const [output, setOutput] = useState(null);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [modal1, setModal1] = useState(false);
  const mode = 'real'; // 'real' or 'sils' (실제 위치 or SILS 위치)
  const [sessionUUID, setSessionUUID] = useState("");

  // 연오한테서 SILS 속 위치 받아오기
  const getSILSGPS = async () => {
    setLat(37.555);
    setLng(117.333);
    // const url = 'http://';
  
    // try {
    //   const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //   });
  
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
  
    //   console.log('Response from server:', response);

    //   const data = await response.json();
    //   setLat(data.latitude);
    //   setLng(data.longitude);

    //   console.log('SILS GPS:', data.latitude, data.longitude);
    // } catch (error) {
    //   console.error('Error getting position from SILS server:', error);
    // }
  };

  // init().then(() => {
  //   const urbr       = new UrbrFront       (); // LSTM 수행하는 객체 만들기
  //   const out_buffer = UrbrFront.out_buffer(); // LSTM 출력 버퍼 (크기 100짜리 Float32Array)

  //   // GPS 데이터
  //   // getGPSData();
  //   const lat = 127, log = 37;

  //   // 수행하고 나면 output에 100개가 담김
  //   urbr.inference(lat, log, out_buffer);

  //   // output을 서버로 전송
  //   console.log(out_buffer);
  // });
  
  // useEffect(() => {
  //   init().then(() => {
  //     setUrbrFront(new UrbrFront());
  //     setOutput(new Float32Array(numParameters));
  //     // 저 세개 값이 변경되면 나머지 useeffect로 실행하도록 구현
  //   });
  // }, []);

  // // 0.5초 간격으로 계속 수행할 함수
  // const calcPosition = (lat, lat) => {
  //   // Float32Array로 된 LSTM 파라미터
  //   // 실제로는 앱에 내장되어 있어야 함
  //   const parameters = new Float32Array(num_parameters);
  //   urbr.load(parameters);

  //   // LSTM 수행하고 나면 output에 100개가 담김
  //   urbr.forward(lat, lat, output);
  // }
  

  useEffect(() => {
    // 현재 위치 가져오기 및 서버로 위치 전송
    const sendCurrentPositionToServer = async (position) => {
      const { latitude, longitude } = position.coords;
      const userID = sessionStorage.getItem('user_id');
      setLat(latitude);
      setLng(longitude);

      const url = 'http://5.36.111.164:40765/updatePosition';//'http://5.36.111.164:40765/pedHandler'; // 엔드포인트 주소에 맞게 수정

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            latitude,
            longitude,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Retrieve session UUID from sessionStorage
        const storedSessionUUID = sessionStorage.getItem("user_id");
        setSessionUUID(storedSessionUUID);
    
        // Check for collision
        checkForCollision(storedSessionUUID, data.pedestrianUUIDs);
        console.log('Response from server:', data.pedestrianUUIDs);
      } catch (error) {
        console.error('Error sending position to server:', error);
      }
    };

    if (mode === 'real') {
      // 실제 위치 받아오기
      navigator.geolocation.getCurrentPosition(
        sendCurrentPositionToServer,
        (error) => {
          console.error('Error getting current position:', error.message);
        }
      );
    } else {
      // 가상 위치 받아오기
      getSILSGPS();
    }

    // 위치 업데이트 주기 설정 (예: 1초마다)
    const watchPositionOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    const watchPositionId = navigator.geolocation.watchPosition(
      (position) => {
        sendCurrentPositionToServer(position);
      },
      (error) => {
        console.error('Error watching position:', error.message);
      },
      watchPositionOptions
    );

    // 카카오 지도 렌더링
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng), // 서울의 위도, 경도
      level: 1, // 지도 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options);
    var markerPosition = new window.kakao.maps.LatLng(lat, lng);
    var marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    // 컴포넌트 언마운트 시 위치 감시 중단
    return () => {
      navigator.geolocation.clearWatch(watchPositionId);
    };
  }, [lat, lng]);
	
	function checkForCollision(sessionUUID, serverUUIDs) {
		// Check if session UUID is present in server UUIDs
		const isCollision = serverUUIDs.includes(sessionUUID);
	
		if (isCollision) {
		  // Trigger collision warning
		  setModal1(true);
		}
	}
  
  return (
    <>
    <div id="map" style={{ width: '100%', height: '100%' }}></div>
    <Modal open={modal1} className="customOverlay">
      <div id="popIngredient" className="layerPopup pop_ingredient">
          <div className="popup">
              <div className="p_head botm">
                  <button type="button" className="b-close btn_close" onClick={() => setModal1()}>
                      <span>x</span>
                  </button>
              </div>
            <CollisionWarning />
            {/* <PushNotification /> */}
            {/* <Vibration /> */}
          </div>
      </div>
    </Modal>
    </>
  );
};

export default MainMap;
