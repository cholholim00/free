let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underline = document.getElementById("under-line");
let taskTabs = document.querySelectorAll(".task-tabs div");
let taskList = []; //할일 항목 저장
let deletedTasks = []; // 삭제된 항목을 저장하는 배열
let filter = "all"; //필터 상태를 저장하자

// 초기 탭 슬라이드 위치 설정 (맥북 대응)
window.onload = function () {
    let activeTab = document.querySelector(".task-tabs div.active");
    if (activeTab) {
        setTimeout(() => {
            moveUnderline(activeTab);
        }, 50); // 맥북 사파리에서 딜레이 
    }
};

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // 엔터 키 감지
        addTask();
    }
});
taskTabs.forEach((tab) => {
    tab.addEventListener("click", changeTab);
});

function addTask() {
    let taskContent = taskInput.value.trim();
    if (!taskContent) {
        alert("할 일을 입력해주세요!!"); //경고 메세지 출력
        return; // 빈 값 방지하기 위해(공백 입력 차단)
    }
    let task = { text: taskContent, image: "./고양이.png", isCompleted: false };
    
    taskList.push(task);
    taskInput.value = ""; //입력 필드를 초기화한다
    render();
}

function changeTab(event) {
    let target = event.target;

    //  underline 위치 조정 (맥북에서도 부드럽게 적용)
    moveUnderline(target);
    filter = target.dataset.filter;

    //탭 이동 시 underline 위치 조정
    underline.style.left = `${event.target.offsetLeft}px`;
    underline.style.width = `${event.target.offsetWidth}px`;

    taskTabs.forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");
    render();
}
//  원본 리스트에서 정확한 인덱스를 찾아 상태 변경
function toggleComplete(index) {
    let realIndex = taskList.findIndex(task => task === filterList()[index]);

    if (realIndex !== -1) {
        taskList[realIndex].isCompleted = !taskList[realIndex].isCompleted;
    }
    render();
}

// 삭제도 원본 리스트에서 정확한 위치 찾아서 삭제
function deleteTask(index) {
    let realIndex = taskList.findIndex(task => task === filterList()[index]);

    if (realIndex !== -1) {
        deletedTasks.push(taskList[realIndex]); // 삭제 목록에 저장
        taskList.splice(realIndex, 1); // 원본에서 삭제
    }
    render();
}

function restoreTask(index) {
    taskList.push(deletedTasks[index]);
    deletedTasks.splice(index, 1);
    render();
}

// 완전히 삭제
function permanentlyDeleteTask(index) {
    deletedTasks.splice(index, 1); // 완전 삭제
    render();
}

// 현재 필터에 맞는 리스트 반환
function filterList() {
    return taskList.filter(task => {
        if (filter === "all") return true;
        if (filter === "progress") return !task.isCompleted;
        return task.isCompleted;
    });
}

//  현재 필터에 맞는 할 일만 반환
    function render() {
        let taskBoard = document.getElementById("task-board");
        let deletedBoard = document.getElementById("deleted-board");
        taskBoard.innerHTML = "";
        deletedBoard.innerHTML = "";
    
        filterList().forEach((task, index) => {
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            if (task.isCompleted) taskDiv.classList.add("completed");
    
            taskDiv.innerHTML = `
                <img src="${task.image}" class="task-img">
                <span>${task.text}</span>
                <button onclick="toggleComplete(${index})">${task.isCompleted ? "되돌리기" : "✔"}</button>
                <button onclick="deleteTask(${index})">🗑</button>
            `;
            taskBoard.appendChild(taskDiv);
        });
    
        deletedTasks.forEach((task, index) => {
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("task", "deleted");
    
            taskDiv.innerHTML = `
                <img src="${task.image}" class="task-img">
                <span>${task.text}</span>
                <button onclick="restoreTask(${index})">⏪ 복구</button>
                <button onclick="permanentlyDeleteTask(${index})">❌ 완전 삭제</button>
            `;
            deletedBoard.appendChild(taskDiv);
        });
    }
    
// underline 이동 함수 (맥북 대응 최적화)
function moveUnderline(target) {
    underline.style.transition = "all 0.3s ease-in-out";
    underline.style.left = `${target.offsetLeft}px`;
    underline.style.width = `${target.offsetWidth}px`;
}