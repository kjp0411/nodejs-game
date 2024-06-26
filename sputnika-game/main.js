import { Engine, Render, Runner, World, Bodies, Body, Events, Composite } from "matter-js";
import { PLANETS } from "./planets";


// 기본 환경 구성
const engine = Engine.create();  // 물리 엔진 정의
const world = engine.world;  // 환경 조성

let gamescore = 0; //게임스코어
let timer = 60; // 초기 제한시간

let fust = false;
let sacund = false;
let serd = false;

engine.gravity.scale = 0;  // 중력의 크기

// 게임 화면 그리기
const render = Render.create({
  element: document.body,  // 어디에 그릴 것인지
  engine: engine,  // 게임 엔진
  // 게임의 화면 크기
  options: {  
    width: 1980,  
    height: 1080,
    wireframes: false,
    background: './space.png',
  }
});

Render.run(render);  // 렌더 실행
Runner.run(engine);  // 엔진 실행

const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '900px';
scoreElement.style.left = '40px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '50px';
scoreElement.style.fontWeight = 'bold';
document.body.appendChild(scoreElement);

const timerElement = document.createElement('div');
timerElement.style.position = 'absolute';
timerElement.style.top = '30px';
timerElement.style.left = '1700px';
timerElement.style.color = 'white';
timerElement.style.fontSize = '50px';
timerElement.style.fontWeight = 'bold';
document.body.appendChild(timerElement);


const startImage = new Image(); // 시작 이미지 생성
startImage.src = 'start_image.png'; // 이미지 경로 지정
startImage.style.position = 'absolute';
startImage.style.top = '450px'; // 이미지의 상단 위치를 300px로 설정
startImage.style.left = '850px'; // 이미지의 좌측 위치를 500px로 설정
startImage.style.width = '200px'; // 이미지의 가로 길이
startImage.style.height = 'auto'; // 이미지의 세로 길이를 가로 길이에 맞춤
startImage.style.cursor = 'pointer';
document.body.appendChild(startImage);

const gameOverImage = new Image();  // 게임 오버 이미지
gameOverImage.src = 'game_over.png';
gameOverImage.style.position = 'absolute';
gameOverImage.style.top = '450px';
gameOverImage.style.left = '850px';
gameOverImage.style.width = '200px';
gameOverImage.style.height = 'auto';
gameOverImage.style.display = 'none'; // 이미지를 처음에는 숨깁니다.
document.body.appendChild(gameOverImage); // 이미지를 body에 추가합니다.



// 오디오 엘리먼트 생성
const buttonSound = new Audio('start_button.mp3');

startImage.style.transition = 'transform 0.3s'; // 변환에 대한 전환 효과 설정

// 마우스가 이미지 위에 있을 때 크기 조정
startImage.addEventListener('mouseenter', () => {
  startImage.style.transform = 'scale(1.2)'; // 1.2배 확대
});

// 마우스가 이미지를 벗어날 때 원래 크기로 복원
startImage.addEventListener('mouseleave', () => {
  startImage.style.transform = 'scale(1)'; // 원래 크기로 복원
});

startImage.addEventListener('click', () => {
  startImage.style.display = 'none'; // 시작 이미지 숨김
  startGame(); // 게임 시작 함수 호출
  buttonSound.play();
});

const circle1 = Bodies.circle(600, 540, 150, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: 'rgba(255, 255, 255, 0.2)', // 투명도 조절
    strokeStyle: 'transparent', // 테두리 색상
  }
});

const circle2 = Bodies.circle(1350, 540, 380, {
  isStatic: true,
  isSensor: true,
  render: {
    fillStyle: 'rgba(255, 255, 255, 0.2)', // 투명도 조절
    strokeStyle: 'transparent', // 테두리 색상
  }
});

const startGame = () => {
  // 중력이 모이는 가운에 원 만들기
  const centerGravity = Bodies.circle(1350, 540, 40, {  // x좌표 : 700, y좌표 : 300, radius(반지름) : 30
    isStatic: true,  // 움직이지 않도록 고정
    // isSensor: true, // 충돌 감지만 가능하도록 설정
    render: {  // 그리기
      fillStyle: 'transparent',  // 투명 스타일로 지정
      strokeStyle: 'white',  // 선 색상
      lineWidth: 3,  // 선 두께
    }
  });

  // 남은 로켓의 개수를 표시 기능
  const ex1 = Bodies.circle(75, 50, 20, {  // x좌표 : 100, y좌표 : 500, radius(반지름) : 20
    isStatic: true,  // 움직이지 않도록 고정
    // isSensor: true, // 충돌 감지만 가능하도록 설정
    angle: Math.PI / 4,  // 45도 회전
    render: {  // 그리기
      sprite: {
        texture: 'rocket.png',  // 로켓 이미지 경로
        xScale: 1.5,
        yScale : 1.5
      }
    }
  });
  const ex2 = Bodies.circle(150, 50, 20, {  // x좌표 : 150, y좌표 : 500, radius(반지름) : 20
    isStatic: true,  // 움직이지 않도록 고정
    // isSensor: true, // 충돌 감지만 가능하도록 설정
    angle: Math.PI / 4,  // 45도 회전
    render: {  // 그리기
      sprite: {
        texture: 'rocket.png',  // 로켓 이미지 경로
        xScale: 1.5,
        yScale : 1.5
      }
    }
  });
  const ex3 = Bodies.circle(225, 50, 20, {  // x좌표 : 200, y좌표 : 500, radius(반지름) : 20
    isStatic: true,  // 움직이지 않도록 고정
    // isSensor: true, // 충돌 감지만 가능하도록 설정
    angle: Math.PI / 4,  // 45도 회전
    render: {  // 그리기
      sprite: {
        texture: 'rocket.png',  // 로켓 이미지 경로
        xScale: 1.5,
        yScale : 1.5
      }
    }
  });
  scoreElement.textContent = `Score: ${gamescore}`;
  timerElement.textContent = `Timer: ${timer}`;
  World.add(world, [centerGravity,ex1,ex2,ex3, circle1, circle2]); //[centerGravity, 계속 추가 가능]

  //타이머
  const countdown = setInterval(() => {
    timer--;  // 타이머 시간 감소
    timerElement.textContent = `Timer: ${timer}`;  // 화면에 타이머 표시

    // 타이머가 0이 되면 타이머 종료
    if (timer === 0) {
      clearInterval(countdown);

      // 게임 오버 이미지 표시
      gameOverImage.style.display = 'block';

      // 마지막 점수 표시
      scoreElement.textContent = `Final Score: ${gamescore}`;
    }
  }, 1000);

  // 행성 생성하기

  let shootingPlanet;  // 플레이어가 쏠 행성
  let isDragging = false;  // 행성 드래그
  let isShooting = false;  // 행성 쏘기

  const createPlanet = () => {
    let index = Math.floor(Math.random() * 4); // 행성 인덱스
    let planet = PLANETS[index];

    shootingPlanet = Bodies.circle(600, 540, planet.radius, {
      index: index,
      isStatic: true,  // 행성 고정
      render: {
        sprite: { texture: `./${planet.name}.png` }  // 행성 이미지 경로
      }
    });
    World.add(world, shootingPlanet);
  };


  const createRocket = () => {
    
    // shootingPlanet 객체가 600, 540 위치에 있는지 확인하는 함수
    function isAtPosition(shootingPlanet, x, y) {
      return shootingPlanet.position.x === x && shootingPlanet.position.y === y;
    }
    
    if (shootingPlanet && isAtPosition(shootingPlanet, 600, 540)) {
      World.remove(world, shootingPlanet);
    }

    let index = 1;  // 0~1까지 랜덤으로 행성 생성
    let planet = PLANETS[index];  // index에는 0~1까지 들어감

    shootingPlanet = Bodies.circle(600, 540, planet.radius, {
      index: index,
      angle: Math.PI / 2,
      isStatic: true,  // 행성 고정
      render: {
        sprite: { texture: `./rocket.png` }  // 행성 이미지 경로
      }
    });
    World.add(world, shootingPlanet);
  };

  let rKeyPressCount = 0;
let RKeyPressCount = 0;
let isKeyDisabled = false; // 키 입력 비활성화 여부를 추적하는 변수

window.addEventListener('keydown', (event) => {
  if ((event.key === 'r' || event.key === 'R') && !isDragging && !isShooting && !isKeyDisabled) {
    if (event.key === 'r') {
      rKeyPressCount++; // "r" 키 입력이면 카운터 증가
    } else {
      RKeyPressCount++; // "R" 키 입력이면 카운터 증가
    }

    if (rKeyPressCount + RKeyPressCount <= 3) { // 카운터가 3 이하인 경우에만 로켓 생성
      // "createRocket()" 함수를 1.5초 뒤에 실행
      setTimeout(() => {
        createRocket();  // 'r' 키를 눌렀을 때 행성 새로 생성
      }, 1000);

      // "r" 및 "R" 키 입력이 1번 입력될 때마다 ex3, ex2, ex1 순서대로 제거
      if (rKeyPressCount + RKeyPressCount === 1) {
        World.remove(world, ex3);
      } else if (rKeyPressCount + RKeyPressCount === 2) {
        World.remove(world, ex2);
      } else if (rKeyPressCount + RKeyPressCount === 3) {
        World.remove(world, ex1);
      }

      // 키 입력 비활성화 설정 및 3초 후에 다시 활성화
      isKeyDisabled = true;
      setTimeout(() => {
        isKeyDisabled = false;
      }, 3000);
    }
  }
});

  // 행성 드래그 이벤트

  // 행성 간의 거리 측정
  window.addEventListener('mousedown', (event) => {
    // 마우스 좌표
    const mousePosition = {
      x: event.clientX,
      y: event.clientY
    };

    // 행성의 중심과 마우스 좌표의 거리 계산 -> 유클리드 거리
    const distanceToPlanet = Math.sqrt(
      (mousePosition.x - shootingPlanet.position.x) ** 2 +
      (mousePosition.y - shootingPlanet.position.y) ** 2
    );

    // 행성의 중심과 마우스 좌표의 거리가 쏘는 행성의 반지름보다 작으면
    // isDragging = true가 되어 행성을 드래그 할 수 있다.
    if (distanceToPlanet < shootingPlanet.circleRadius) {
      isDragging = true;
      // console.log('click') -> 디버깅 용
    }
  });

  // isDragging = true 일 경우만 행성이 마우스 포인트를 따라간다.
  window.addEventListener('mousemove', (event) => {
    if (isDragging) {
      // 마우스의 새로운 위치
      const newPosition = { x: event.clientX, y: event.clientY };

      // 원의 중심 좌표
      const circleCenterX = circle1.position.x;
      const circleCenterY = circle1.position.y;

      // 원의 반지름
      const circleRadius = 150;

      // 행성의 새로운 위치와 원의 중심 사이의 거리
      const distanceToCircleCenter = Math.sqrt(
        (newPosition.x - circleCenterX) ** 2 +
        (newPosition.y - circleCenterY) ** 2
      );

      // 행성의 새로운 위치가 원의 경계를 벗어나지 않는지 확인
      if (distanceToCircleCenter <= circleRadius) {
        // 행성의 위치를 새로운 위치로 업데이트
        Body.setPosition(shootingPlanet, newPosition);
      } else {
        // 행성의 위치를 원의 경계에 맞게 조정하여 원 안에 머무르도록 함
        const angle = Math.atan2(newPosition.y - circleCenterY, newPosition.x - circleCenterX);
        const x = circleCenterX + circleRadius * Math.cos(angle);
        const y = circleCenterY + circleRadius * Math.sin(angle);
        Body.setPosition(shootingPlanet, { x, y });
      }
    }


  });

  // 행성마다 힘의 크기
  const forceMultiplier = [0.00075, 0.0013, 0.0027, 0.004, 0.0077];
  // 오디오 엘리먼트 생성
  const shootingSound = new Audio('shooting_sound.mp3');

  // 마우스를 떼면 isDragging = false로 한다.
  window.addEventListener('mouseup', (event) => {
    if (isDragging) {
      isShooting = true;  // 드래깅했을 때 슈팅을 true로 한다.
    } else {
      return;  // 드래그 중이 아니라면 코드 실행 중지
    }


    // 원의 중심 좌표
    const circleCenterX = circle1.position.x;
    const circleCenterY = circle1.position.y;

    // 행성의 현재 위치
    const shootingPlanetX = shootingPlanet.position.x;
    const shootingPlanetY = shootingPlanet.position.y;

    // 행성과 원 중심 사이의 거리 계산
    const distanceX = shootingPlanetX - circleCenterX;
    const distanceY = shootingPlanetY - circleCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if(distance==0){
      
      isDragging = false;
      isShooting = false;
      return
    }
    // 효과음 재생
    shootingSound.play();

    
    // 행성을 발사할 위치 (원의 중심 방향)
    const shootingPosition = {
      x: shootingPlanetX - (distanceX / distance) * shootingPlanet.circleRadius,
      y: shootingPlanetY - (distanceY / distance) * shootingPlanet.circleRadius
    };

    // 행성의 고정 해제
    Body.setStatic(shootingPlanet, false);

    // 행성을 원의 중심 방향으로 발사하기 위한 힘의 방향 계산
    const forceDirection = {
      x: circleCenterX - shootingPosition.x,
      y: circleCenterY - shootingPosition.y
    };

    // 힘을 작용시키는 applyForce 함수
    // 행성의 인덱스에 따라 다른 힘의 크기를 적용합니다.
    const index = shootingPlanet.index;
    const forceMultiplierForPlanet = forceMultiplier[index];
    Body.applyForce(shootingPlanet, shootingPosition, {
      x: forceDirection.x * forceMultiplierForPlanet,  
      y: forceDirection.y * forceMultiplierForPlanet  
    });

    isDragging = false;
    isShooting = false;

    setTimeout(() => {
      createPlanet();
    }, 1000);  // 몇 초 뒤에 행성이 다시 생성되는지 시간 설정
  });




  // 만유인력의 법칙
  Events.on(engine, 'beforeUpdate', (event) => {
    const bodies = Composite.allBodies(world);

    bodies.forEach(body => {
      const dx = centerGravity.position.x - body.position.x;
      const dy = centerGravity.position.y - body.position.y;

      const distanceSquared = dx * dx + dy * dy;
      const forceMagnitude = 0.3 * body.mass / distanceSquared;

      Body.applyForce(body, body.position, {x: forceMagnitude * dx, y: forceMagnitude * dy});
    })
  });

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      const textureA = collision.bodyA.render.sprite.texture;  // bodyA의 텍스처
      const textureB = collision.bodyB.render.sprite.texture;  // bodyB의 텍스처
  
      // rocket.png와의 충돌을 확인하는 조건
      const isRocketCollision = (
        (textureA === './rocket.png' && collision.bodyB !== centerGravity && collision.bodyB !== ex1 && collision.bodyB !== ex2 && collision.bodyB !== ex3 && collision.bodyB !== circle1 && collision.bodyB !== circle2) ||
        (textureB === './rocket.png' && collision.bodyA !== centerGravity && collision.bodyA !== ex1 && collision.bodyA !== ex2 && collision.bodyA !== ex3 && collision.bodyA !== circle1 && collision.bodyA !== circle2)
      );
  
      // rocket.png와 충돌한 경우 점수를 추가하는 로직
      if (isRocketCollision) {
        const index = textureA === './rocket.png' ? collision.bodyB.index : collision.bodyA.index;
        switch (index) {
          case 0:
            gamescore += 1; // rocket과 충돌 시 다른 점수
            break;
          case 1:
            gamescore += 2;
            break;
          case 2:
            gamescore += 4;
            break;
          case 3:
            gamescore += 8;
            break;
          case 4:
            gamescore += 16;
            break;
          case 5:
            gamescore += 32;
            break;
          case 6:
            gamescore += 64;
            break;
          case 7:
            gamescore += 128;
            break;
          case 8:
            gamescore += 256;
            break;
        }
        scoreElement.textContent = `Score: ${gamescore}`;  // 업데이트 스코어
        World.remove(world, [collision.bodyA, collision.bodyB]);  // 충돌한 두 물체 제거
      } else {
        // 충돌한 두 물체의 인덱스가 같은 경우에만 다음 행성을 생성하여 추가합니다.
        if (collision.bodyA.index === collision.bodyB.index) {
          const index = collision.bodyA.index;
  
          // 행성이 합쳐질 때 인덱스에 따라 점수를 추가
          switch (index) {
            case 0:
              gamescore += 2;
              break;
            case 1:
              gamescore += 4;
              break;
            case 2:
              gamescore += 8;
              break;
            case 3:
              gamescore += 16;
              break;
            case 4:
              gamescore += 32;
              break;
            case 5:
              gamescore += 64;
              break;
            case 6:
              gamescore += 128;
              break;
            case 7:
              gamescore += 256;
              break;
            case 8:
              gamescore += 512;
              break;
          }
          scoreElement.textContent = `Score: ${gamescore}`;  // 업데이트 스코어
  
          if (index === PLANETS.length - 1) {
            return;
          }
          World.remove(world, [collision.bodyA, collision.bodyB]);
  
          // 보너스 시간 추가
          if (!fust && gamescore >= 100) {
            fust = true;
            timer += 30;
          }
          if (!sacund && gamescore >= 200) {
            sacund = true;
            timer += 20;
          }
          if (!serd && gamescore >= 300) {
            serd = true;
            timer += 10;
          }
  
          const newPlanet = PLANETS[index + 1];
          const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newPlanet.radius,
            {
              index: index + 1,
              render: {
                sprite: { texture: `./${newPlanet.name}.png` }
              }
            }
          );
  
          World.add(world, newBody);
        }
      }
    });
  });

  createPlanet();
};