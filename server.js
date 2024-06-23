const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL 설정
const pool = new Pool({
  connectionString: 'postgres://work:@Xfpdltj0@work-db.postgres.database.azure.com/work?sslmode=require',
  ssl: {
    rejectUnauthorized: false // SSL 인증서 검사 비활성화
  }
});

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  
  let meta;
  console.log (req.path);

  switch (req.path) {
    case '/thepeak-dosan': 
      meta = `
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <meta property="og:title" content="더 피크 도산">
        <meta property="og:description" content="틀에 박힌 상상의 선을 넘어서는 단 하나의 예술이 되다. Above All The Peak">
        <meta name="description" content="틀에 박힌 상상의 선을 넘어서는 단 하나의 예술이 되다. Above All The Peak">
        <meta name="naver-site-verification" content="ff0de032ce836bd975813bbdce30a08a9d1344db">
        <meta property="og:image" content="https://thepeak-dosan.com/data/logo/1785037329_W8lkhQjt_EAB7B8EBA6BC123.jpg">
        <meta name="title" content="더 피크 도산">
        <meta name="type" content="Website">
        <meta name="subject" content="레지던스 분양">
        <meta name="image" content="https://thepeak-dosan.com/data/logo/1785037329_W8lkhQjt_EAB7B8EBA6BC123.jpg">
        <meta name="description" content="틀에 박힌 상상의 선을 넘어서는 단 하나의 예술이 되다. Above All The Peak">
        <meta name="keywords" content="레지던스, 하이엔드, 하이퍼엔드, 하이엔드 레지던스, 하이퍼엔드 레지던스, 도산 레지던스, 도산 하이엔드 레지던스, 도산 하이퍼엔드 레지던스, 건축가, HERZOG, DE MEURON, 도산공원">
        <meta name="author" content="주식회사 트레이서">
        <meta name="copyright" content="주식회사 트레이서">
        <meta property="og:title" content="더 피크 도산">
        <meta property="og:image" content="https://thepeak-dosan.com/data/logo/1785037329_W8lkhQjt_EAB7B8EBA6BC123.jpg">
        <meta property="og:description" content="틀에 박힌 상상의 선을 넘어서는 단 하나의 예술이 되다. Above All The Peak">
        <meta property="og:site_name" content="더 피크 도산">
        <meta name="naver-site-verification" content="ff0de032ce836bd975813bbdce30a08a9d1344db">
        <meta name="facebook-domain-verification" content="xp7ihigjvdhjs7npsbug83224rbsdl">
        <title>더 피크 도산</title>
      `
      break;
    case '/geomdan-duklass': 
      meta = `
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="#4f4f4f">
        <meta name="msapplication-navbutton-color" content="#4f4f4f">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta property="og:url" content="http://geomdan-duklass.co.kr/">
        <title>검단사거리역 듀클래스</title>
        <meta name="application-name" content="검단사거리역 듀클래스">
        <meta name="msapplication-tooltip" content="검단사거리역 듀클래스">
        <meta id="meta_og_title" property="og:title" content="검단사거리역 듀클래스">
        <meta name="description" content="검단과 유럽이 만나다. 검단사거리역 첫 유러피언 클래스 듀클래스">
        <meta property="og:description" content="검단과 유럽이 만나다. 검단사거리역 첫 유러피언 클래스 듀클래스">
        <meta id="meta_og_image" property="og:image" content="https://cdn.imweb.me/upload/S202006167973839cbad53/2e6cc1a8b4a1c.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="627">
      `
      break;

    default:
      meta = `
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">
      `
      break;
    }



  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  ${meta}
  <script>
    // 쿠키 설정 함수
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
    }

    // 쿠키 읽기 함수
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // URL 파라미터 읽기 함수
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
    }

    // 디바이스 유형 판별 함수
    function getDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch|iemobile)/.test(userAgent)) {
            return 'mobile';
        }
        return 'pc';
    }

    // IP 주소 획득 함수
    async function getIpAddress() {
      try {
          const response = await fetch('https://ipinfo.io/json?token=58ab8efa47c986');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          return data.ip;
      } catch (error) {
          console.error('Error fetching IP address:', error);
          return null;
      }
    }

    // 데이터 전송 공통 함수 (비동기식으로 변경)
    async function sendData(data) {
      var json = JSON.stringify(data);
      console.log("Sending data:", json);
      
      try {
        const response = await fetch("/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: json
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        console.log("Data sent successfully");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }

    const scriptsLoaded = {
      google: false,
      facebook: false,
      kakao: false
    };

    function scriptLoaded(scriptName) {
      scriptsLoaded[scriptName] = true;
      if (Object.values(scriptsLoaded).every(Boolean)) {
        allScriptsLoaded();
      }
    }

    async function allScriptsLoaded() {
      console.log('All tracking pixels have been loaded and executed.');
      // 여기서 원하는 이벤트를 실행합니다.
      var gta = getCookie('_gta');
      if (!gta) {
          gta = 'gta_' + Math.random().toString(36).substring(2, 15) + "_" + new Date().getTime().toString(36);
          setCookie('_gta', gta, 730); // 2년 동안 유지되는 쿠키
      }

      // 쿠키가 설정될 때까지 반복해서 확인
      function checkCookies() {
        var g_ga = getCookie('_ga');
        var g_fba = getCookie('_fbp');
        
        
        if (g_ga && g_fba) {
          getIpAddress().then(ip => {
            // 기본 데이터 준비
            var data = {
              g_ta: gta, // 쿠키에서 생성한 사용자 ID
              g_ga: g_ga, // _ga 쿠키 값
              g_fba: g_fba, // _fbp 쿠키 값
              gate_type: getUrlParameter('gate_type'),
              site_code: getUrlParameter('site_code'),
              source: getUrlParameter('source'),
              medium: getUrlParameter('medium'),
              content: getUrlParameter('content'),
              url: window.location.href,
              referrer: document.referrer,
              device: getDeviceType(),
              ip: ip, // IP 주소
              headers: navigator.userAgent, // 헤더 정보
              created_at: new Date().getTime(),
            };
    
            console.log("Data prepared:", data);

            

            sendData(data).then(() => {
              console.log("완료");
              if (getUrlParameter('site_code') === 'thepeak-dosan' || getUrlParameter('site_code') === 'geomdan-duklass') {
                if (document.referrer.indexOf('?') > 0) {
                  window.location.href = document.referrer + '&_gta=' + data.g_ta;
                } else {
                  window.location.href = document.referrer + '?_gta=' + data.g_ta;
                }
              }
            }).catch(error => {
              console.error("Error sending data:", error);
            });
          });
        } else {
          console.log("쿠키가 아직 설정되지 않음. 다시 확인합니다.");
          setTimeout(checkCookies, 100); // 100ms 후에 다시 확인
        }
      }
      
      checkCookies();
    }
  </script>
</head>
<body>
  <div class="container">
    <h3>사이트 접속중입니다. 잠시만 기다려 주십시오.</h3>
  </div>


  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-MZVYWBWQEM" onload="scriptLoaded('google')"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-MZVYWBWQEM');
  </script>


  <!-- Meta Pixel Code -->
  <script>
    function fbqLoaded() {
      fbq('init', '637073014924793');
      fbq('track', 'PageView');
      scriptLoaded('facebook');
    }
    
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;t.onload = fbqLoaded;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=637073014924793&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <!-- KAKAO Pixel Code -->
  <script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js" onload="scriptLoaded('kakao')"></script>
  <script type="text/javascript">kakaoPixel('6836918514203145606').pageView();</script>
  <!-- End KAKAO Pixel Code -->
</body>
</html>
  `);
});

// 데이터 저장 API 엔드포인트
app.post('/api/saveData', async (req, res) => {
  const {
    g_ta, g_ga, g_fba, gate_type, site_code, source,
    medium, content, url, referrer, device, ip, headers, created_at
  } = req.body;

  try {
    const query = `
      INSERT INTO gate (
        g_ta, g_ga, g_fba, gate_type, site_code, source,
        medium, content, url, referrer, device, ip, headers
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
      g_ta, g_ga, g_fba, gate_type, site_code, source,
      medium, content, url, referrer, device, ip, JSON.stringify(headers)
    ];
    await pool.query(query, values);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).send('Error saving data');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
