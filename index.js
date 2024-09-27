// 사용할 dom 생성하기
// getElementById가 코틀린에서 Id로 가져오는 것 생각하기
document.addEventListener('DOMContentLoaded', function(){
    const chatLog = document.getElementById('chat-log'),
        userInput = document.getElementById('user-input'),
        sendButton = document.getElementById('send-button'),
        buttonIcon = document.getElementById('button-icon'),
        info = document.querySelector('.info');

    // 2. 버튼 클릭 시 이벤트 추가하기
    //이벤트 타입, 실행할 함수 순으로 넘겨줌
    sendButton.addEventListener('click', sendMessage);

    // EventListener의 매개로 주는 함수 적기
    function sendMessage(){
        // 1. 받아온 값 저장하기
        // trim() 함수는 받아온 문자열의 시작 끝의 공백 제거
        const message = userInput.value.trim();

        // 2. 공백만 입력받았을 때 send 하지 않기
        if (message === ''){
            return
        }else{// message가 비어있지 않다면
            // 3. 사용자가 입력한 message 화면에 띄우기 (container)
            appendMessage('user', message);

            setTimeout(() => {
                appendMessage('bot', 'Made By Jiyeon\n')// 여기에 원래 API 연결해서 답변 받아오는 거 함
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane')// 로딩에서 비행기 버튼으로 다시 바꾸는 과정
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse')
            }, 1000);// 1000이 1초를 의미함
            return
        }
    
    }
    function appendMessage(sender, message){

        // 화면 중앙의 문구를 없애줘야 함
        info.style.display = 'none';

        // 버튼 아이콘 바꾸기
        buttonIcon.classList.remove('fa-solid', 'fa-paper-plane')// 비행기 버튼을 없애고
        buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse')// 로딩 중 화면으로 전환함

        // 챗봇과 사용자의 메세지 띄우기
        
        // 메세지를 담을 Node 생성하기
        const chatElement = document.createElement('div');
        const messageElement = document.createElement('div');
        const iconElement = document.createElement('div');
        const icon = document.createElement('i');

        // class 추가하기: 구분을 우해서 선언
        chatElement.classList.add('chat-box');
        iconElement.classList.add('icon');
        messageElement.classList.add(sender); // 전송자가 사용자인지 봇인지 명시

        // text 추가하기
        messageElement.innerText = message;

        // sender에 따라 icon 추가하기
        if (sender === 'user'){
            icon.classList.add('fa-regular', 'fa-user');
            iconElement.setAttribute('id', 'user-icon');
        }else{
            icon.classList.add('fa-solid', 'fa-robot');
            iconElement.setAttribute('id', 'bot-icon');
        }
        // 정의한 Node를 트리에 연결하기
        iconElement.appendChild(icon);
        chatElement.appendChild(iconElement);
        chatElement.appendChild(messageElement);
        chatLog.appendChild(chatElement);

    }
});