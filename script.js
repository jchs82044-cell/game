// 게임 상태 객체
const player = {
    name: "나의 몬스터",
    maxHp: 100,
    hp: 100,
    skills: [
        { name: "몸통박치기", power: 25 },
        { name: "필살 빔", power: 45 }
    ]
};

const enemy = {
    name: "야생의 적",
    maxHp: 100,
    hp: 100,
    skills: [
        { name: "할퀴기", power: 20 },
        { name: "물대포", power: 35 }
    ]
};

let isBattling = true;

// 화면 UI 업데이트 함수
function updateUI() {
    // 플레이어 HP 반영
    document.getElementById("player-name").innerText = player.name;
    document.getElementById("player-hp-text").innerText = `${player.hp} / ${player.maxHp}`;
    let playerHpPercent = (player.hp / player.maxHp) * 100;
    document.getElementById("player-hp").style.width = `${Math.max(playerHpPercent, 0)}%`;

    // 적 HP 반영
    document.getElementById("enemy-name").innerText = enemy.name;
    document.getElementById("enemy-hp-text").innerText = `${enemy.hp} / ${enemy.maxHp}`;
    let enemyHpPercent = (enemy.hp / enemy.maxHp) * 100;
    document.getElementById("enemy-hp").style.width = `${Math.max(enemyHpPercent, 0)}%`;
}

// 로그 출력 함수
function logMessage(msg) {
    const logBox = document.getElementById("battle-log");
    logBox.innerHTML = msg;
}

// 플레이어 기술 사용 혹은 아이템 사용
function useSkill(skillIndex) {
    if (!isBattling) return;

    // 1. 회복약 선택 시
    if (skillIndex === 2) {
        const healAmount = 30;
        player.hp = Math.min(player.maxHp, player.hp + healAmount);
        logMessage(`회복약을 사용해 체력을 ${healAmount} 회복했습니다!`);
        updateUI();
        
        // 턴 넘기기
        setTimeout(enemyTurn, 1000);
        return;
    }

    // 2. 공격 기술 선택 시
    const selectedSkill = player.skills[skillIndex];
    let damage = selectedSkill.power + Math.floor(Math.random() * 5); // 랜덤 오차
    enemy.hp = Math.max(0, enemy.hp - damage);

    logMessage(`플레이어의 ${selectedSkill.name}! 적에게 ${damage}의 데미지를 주었습니다.`);
    updateUI();

    // 적 체력이 0 이하인지 확인 (플레이어 승리)
    if (enemy.hp <= 0) {
        logMessage("축하합니다! 배틀에서 승리했습니다! 🎉");
        isBattling = false;
        return;
    }

    // 적의 턴으로 전환
    isBattling = false;
    setTimeout(enemyTurn, 1200);
}

// 적의 턴 로직
function enemyTurn() {
    if (enemy.hp <= 0) return;

    // 적이 무작위로 기술 선택
    const randomSkill = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
    let damage = randomSkill.power + Math.floor(Math.random() * 5);
    player.hp = Math.max(0, player.hp - damage);

    logMessage(`적의 ${randomSkill.name}! 플레이어가 ${damage}의 데미지를 입었습니다.`);
    updateUI();

    // 플레이어 체력이 0 이하인지 확인 (패배)
    if (player.hp <= 0) {
        logMessage("체력이 모두 소모되었습니다... 패배했습니다. 😢");
        isBattling = false;
        return;
    }

    isBattling = true;
}

// 게임 리셋
function resetGame() {
    player.hp = player.maxHp;
    enemy.hp = enemy.maxHp;
    isBattling = true;
    logMessage("새로운 배틀이 시작되었습니다! 기술을 선택하세요.");
    updateUI();
}

// 초기 실행
updateUI();
