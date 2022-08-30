# Git

> 출처: [제대로 파는 Git & GitHub - by 얄코](https://www.inflearn.com/course/%EC%A0%9C%EB%8C%80%EB%A1%9C-%ED%8C%8C%EB%8A%94-%EA%B9%83/dashboard)

## 목차

- [01. Git 시작하기](#01-git-시작하기)
  - [Git & GitHub을 알아야 하는 이유](#git--github을-알아야-하는-이유)
    - [CLI와 GUI의 차이](#cli와-gui의-차이)
  - [Git 설정 및 프로젝트 관리 시작하기](#git-설정-및-프로젝트-관리-시작하기)
    - [Git 최초 설정](#git-최초-설정)
  - [프로젝트 생성 및 Git 관리 시작](#프로젝트-생성-및-git-관리-시작)
    - [CLI 프로그램으로 실행](#cli-프로그램으로-실행)
    - [소스트리로 해보기](#소스트리로-해보기)

# 01. Git 시작하기

## Git & GitHub을 알아야 하는 이유

### Git은 VCS란 종류의 프로그램들 중 하나!

- `vcs`란?
  - `Version Control System`의 약자로, 프로그램의 버전 관리를 위한 툴을 말한다. 크게 두 개를 묶어서 설명하면, 프로젝트의 시간과 차원을 관리하는 것이라고 할 수 있다.

#### Git은 프로젝트의 시간과 차원을 자유롭게 넘나들 수 있도록 도와줌

- `시간` - 프로젝트의 버전을 과거로 되돌리거나 특정 내역을 취소할 수 있다.
- `차원` - 프로젝트의 여러 모드를 쉽게 전환하고 관리할 수 있다.

#### 소스코드는 자산

프로그래머에게 코드는 자산이기 때문에 소스코드를 관리할 줄 알아야 한다. 그러한 코드들을 그냥 내 컴퓨터에 저장하여 파일이 날라갈 경우 프로젝트들의 기록이 전부 날라가는 것이다. 따라서 `코딩을 할 때마다 기록하고 저장하고 관리하는 습관`을 들이는 것이 개발자로서 갖춰야할 픽수역량이다.

#### 개발은 함께!

실제로 여러 명이 하는 프로젝트를 하게 되면 코드를 작성하는 것이 쉽지 않다. 예를 들어, 채팅 프로그램을 만드는 등 여러 사람이 같은 하나의 프로젝트에서 작업을 하게 된다. 이 때 Git을 사용하여 프로젝트를 같이 하는 사람들과 코드를 공유할 수 있다. 그리고 현업에서 Git과 GitHub을 안쓰는 곳을 보기 어려울 정도로 Git은 개발자가 꼭 배워야할 역량이라 볼 수 있따.

#### 전세계 개발자들을 만날 수 있는 커뮤니티

- 구글, 네이버, 카카오 등 전세계 개발자들을 만날 수 있는 커뮤니티라고 할 수 있다.

### CLI와 GUI의 차이

- `CLI`는 `Command Line Interface`의 약자로, 말 그대로 명령줄을 입력해서 사용하는 인터페이스이다.
  - 터미널이나 Git Bash 등에 CLI로 명령어를 입력해서 사용하는 방식이다.
- `GUI`는 `Graphical User Interface`의 약자로, 일반인 사용자들이 쓰기 편하도록 그래픽 요소를 활용한 인터페이스이다.
  - 소스트리 등의 프로그램을 사용하는 방식이다.

## Git 설정 및 프로젝트 관리 시작하기

### Git 최초 설정

#### Git 전역으로 사용자 이름과 이메일 주소 설정

- GitHub 계정과는 별개
- 나중에 Git을 사람들과 협업할 때 사용하는데 그 때 누가 어떤 작업을 했고 그 사람한테 어떻게 연락을 할 수 있는지에 사용한다.
- 터미널 프로그램(Git Bash, iTerm2)에서 아래 명령어 실행

  ```bash
  git config --global user.name "(본인 이름)"
  git config --global user.email "(본인 이메일)"
  ```

  - `global`: 해당 컴퓨터에 전반적으로(전역으로) 깃에 기본 설정된다는 의미

  * 프로젝트마다 다르게 설정할 수도 있다.

#### 기본 브랜치명 변경

```bash
git config --global init.defaultBranch main
```

- 프로그래밍에서 master와 slave 이러한 용어들이 사용하고 깃에도 기본 브랜치 이름이 master로 되어있다.
- 안좋은 의미가 연상되는 단어이기 때문에 다른 단어로 대체 -> `main`
- 깃허브도 기본 브랜치 이름을 main으로 바꿨기 때문에 이러한 부분들이 충돌하지 않도록 이름 수정

## 프로젝트 생성 및 Git 관리 시작

### CLI 프로그램으로 실행

- 적당한 위치에 원하는 이름으로 폴더를 생성하고 VS Code로 열람하여 터미널 켜기
  - iTerm2 같은 프로그램을 실행시키지 않아도 에디터에서 해당 폴더에 대해서 터미널 사용 가능
- 해당 폴더에서 아래 명령어 입력
  ```
  git init
  ```
- 폴더에 숨김모드로 존재하기 때문에 단축키로 숨김파일 볼 수 있도록 설정하면 .git 폴더 확인 가능
  - 맥 경우 <b>`command` + `shift` + .</b>
  - .git 폴더에 프로젝트 관리내역이 저장된다.
  - .git 폴더를 지우면 Git 관리내역이 삭제된다. -> Git이 관리하고 있지 않은 상태로 돌아간다.
- 파일 생성1, 2

```yaml
# tigers.yaml
team: Tigers

manager: John

members:
- Linda
- William
- David

# lions.yaml
team: Lions

manager: Mary

members:
- Thomas
- Karen
- Margaret
```

- 아래 명령어 입력
  ```bash
  git status
  ```
  - 현재 폴더의 상황을 Git의 관점으로 보여주는 명령어이다.
  - 새로운 파일들이 Untracked files에 있는 것을 확인할 수 있다.

### 소스트리로 해보기

#### 현존하는 저장소 추라

- 소스트리에 폴더를 드래그하거나, 로컬 저장소 추가

#### Git이 관리하는 저장소 새로 만들기

- .git 폴더 삭제 후 진행
- 소스트리에 폴더를 드래그하거나, 새로 만들기 -> 로컬 저장소 클릭하여 생성

## Git에게 맡기지 않는 것들

### Git의 관리에서 틀정 파일/폴더를 배제해야 할 경우

- 포함할 `필요가 없을` 떄
  - 자동으로 생성 또는 다운로드되는 파일들 (빌드 결과물, 라이브러리)
  - .java 파일 -> .class로 빌드되는 경우
  - node.js를 사용할 때 굳이 깃에 저장하지 않아도 언제든 인터넷에서 다운받을 수 있는 라이브러리 경우 포함X
- 포함하지 `말아야 할` 때
  - 보안상 민감한 정보를 담은 파일(\* 서버의 비밀번호 등은 따로 관리해야 안전)
  - .env 같은 파일들
- `.gitignore` 파일을 사용해서 배제할 요소들을 지정할 수 있다.

### .gitignore 사용해보기

- 폴더에 아래 파일 생성
  ```yaml
  # secrets.yaml
  id: admin
  pw: 1234abcd
  ```
- .gitignore 파일 생성
  ```
  secrets.yaml
  ```

* `git status`로 확인하면 untracked files 목록에 secrets.yaml 파일이 빠져있는 것을 확인할 수 있다.
  - Git의 블랙리스트 같은 파일

### .gitignore 형식

> 참조: https://git-scm.com/docs/gitignore

```
# 이렇게 #를 사용해서 주석

# 모든 file.c -> 특정 파일의 이름을 지목해서 무시하게 만듦(* 파일 이름을 그대로)
file.c

# 최상위 폴더의 file.c -> 해당 프로젝트의 그 안에서 최상위 폴더에 있는 즉, 제일 바깥에 있는 파일 무시
/file.c

# 모든 .c 확장자 파일 -> 특정 확장자의 모든 파일을 무시하고 싶을 때 사용
*.c

# .c 확장자지만 무시하지 않을 파일 -> 위의 특정 확장자 중 무시하지 않을 특정 파일 지정
!not_ignore_this.c

# logs란 이름의 파일 또는 폴더와 그 내용들 -> 해당 폴더를 지정하면 그 안의 파일들까지 무시
logs

# logs란 이름의 폴더와 그 내용들 -> '/'가 있으면 파일이 아니라 폴더라는 것을 명시해주는 것
logs/

# logs 폴더 바로 안의 debug.log와 .c 파일들 -> 특정 파일 안에 특정 파일 무시
logs/debug.log
logs/*.c # 폴더 안에 특정 확장자의 모든 파일을 무시 -> 다른 폴더에서는 무시하지 않음

# logs 폴더 바로 안, 또는 그 안의 다른 폴더(들) 안의 debug.log 전부 무시
logs/**/debug.log
```

# 2. 시간 여행하기

## 변화를 타임캡슐에 담아 묻기

### 프로젝트의 변경사항들을 타임캡슐(버전)에 담기

- 변경사항 확인
  ```
  git status
  ```
  - 추적하지 않는 파일(unstacked files): Git의 관리에 들어간 적 없는 파일, Git이 관리한 적 없는 파일
  - 아직 버전에 넣기 전

#### 파일 하나 담기

```
git add tigers.yaml
```

- `git status`로 확인하면 `Changes to be committed` 목록에 `tigers.yaml` 있는 것을 확인할 수 있다.
  - `Changes to be committed`: 커밋할 변경사항
  - 캡슐에 넣은 단계 -> 이제 캡슐에 묻기만 하면 된다.

#### 모든 파일 담기

```
git add .
```

- `git status`로 확인하면 커밋할 변경사항에 모든 파일이 담긴 것을 확인할 수 있다.

### 타임캠슐 묻기

```
git commit
```

- 깃에서 작업을 `commit`한다. -> 새로운 버전으로 만든다는 의미
- Vi 입력 모드로 진입

  | 작업                | Vi 명령어 | 상세                                         |
  | ------------------- | --------- | -------------------------------------------- |
  | 입력 시작           | i         | 명령어 입력 모드에서 텍스트 입력 모드로 전환 |
  | 입력 종료           | ESC       | 텍스트 입력 모드에서 명령어 입력 모드로 전환 |
  | 저장 없이 종료      | :q        |
  | 저장 없이 강제 종료 | :q!       | 입력한 것이 있을 때 사용                     |
  | 저장하고 종료       | :wq       | 입력한 것이 있을 때 사용                     |
  | 위로 스크롤         | k         | `git log` 등에서 내역이 길 때 사용           |
  | 아래로 스크롤       | j         | `git log` 등에서 내역이 길 때 사용           |

* i를 입력하여 입력 가능하게 만들고 `FIRST COMMIT`을 입력한 뒤 저장하고 종료(`:wq`)
  - `FIRST COMMIT`: 통상적으로 어떤 프로젝트의 첫 버전이 만들어질 때 쓰이는 메시지

### 커밋 메시지와 함께 작성하기

```bash
git commit -m "FIRST COMMIT"
```

- 위의 Vi 모드로 진입하지 않고 편리하게 바로 메시지와 함께 커밋할 수 있는 명령어
- 아래 명령어와 소스트리로 확인
  ```bash
  git log
  ```
  - 종료는 `:q`

## 다음 변경사항들을 만들고 타임캡슐에 묻기1

### 변경사항

- lions.yaml 파일 삭제
- tigers.yaml의 manager를 Donal로 변경
- leopards.yaml 파일 추가

  ```yaml
  team: Leopards

  manager: Luke

  members:
    - Linda
    - William
    - David
  ```

#### `git statua`로 확인

- 파일의 추가(untracked files), 변경(modified), 삭제(deleted) 모두 내역으로 확인 가능

#### `git diff`로 확인

- 변경 사항을 좀 더 구체적으로 그 내용을 보여주는 명령어

  | 작업          | Vi 명령어 | 상세                                  |
  | ------------- | --------- | ------------------------------------- |
  | 위로 스크롤   | k         | `git log` 등에서 내역이 길 때 사용    |
  | 아래로 스크롤 | j         | `git log` 등에서 내역이 길 때 사용    |
  | 끄기          | :q        | `:`가 입력되어 있으므로 q만 눌러도 됨 |

### 캡슐에 담기

```bash
git add .
git commit -m "Replace Lions with Leopards"
```

- `git log`로 확인

#### `add`와 `commit` 한꺼번에!!

```bash
git commit -am "(메시지)"
```

- <b>새로 추가된 파일(untracked files)가 없을 때 한정!</b>
- 새로 추가한 파일이 있을 경우에는 불가, 있으면 아래와 같은 순서로
  - `git add .` -> `git commit -m "(메시지)"`

## 다음 변경사항을 만들고 타임캡슐에 묻기2

### 첫 번째 추가 커밋

1. tigers의 members에 George 추가
2. 커밋 메시지: Add George to Tigers

### 두 번째 추가 커밋

1. cheetas.yaml 추가

```yaml
team: Cheetas

manager: Laura

members:
  - Ryan
  - Anna
  - Justin
```

- 커밋 메시지: Add team Cheetas

### 세 번째 추가 커밋

1. cheetas.yaml 삭제
2. Leopards의 manager를 Nora로 수정
3. panthers.yaml 추가
4. 커밋 메시지: Replace Cheetas with Panthers

```yaml
team: Panthers

manager: Sebastian

members:
  - Violet
  - Stella
  - Anthony
```

## 과거로 돌아가는 두 가지 방법 및 실습

> 커밋이라는 것들 하나하나가 묻어놓은 타임캡슐, 버전이라고 보면 된다.  
> 이것들이 나중에 파낼 때 안에 뭐가 든 건지 미리 알게끔 캡슐마다 작업한 것을 적어서 꼬리표 달아놓은 것

### Git에서 과거로 돌아가는 두 방식

#### reset

- 원하는 시점으로 돌아간 뒤 이후 내역(히스토리)들을 지운다.
  ```
  ---o Replace Cheetas with Panthers--- 삭제
  o Add team Cheetas <- 돌아감
  o Add George to Tigers
  o Replace Lions with Leopards
  o FIRST COMMIT
  ```
  - `Add team Cheetas`로 돌아가기 위해 `Add team Cheetas` 이후 내역을 삭제해서 돌아간다.

#### revert

- 되돌리기원하는 시점의 커밋을 거꾸로 실행한다.
  ```
  o - Replace Cheetas with Panthers
  o Replace Cheetas with Panthers
  o Add team Cheetas
  o Add George to Tigers
  o Replace Lions with Leopards
  o FIRST COMMIT
  ```
  - `reset`처럼 `Replace Cheetas with Panthers`를 삭제시켜 돌아가는 것이 아니라
    - 이 때의 변화를 거꾸로 수행하는 캡슐을 하나 넣음으로써 결과적으로 `Add team Cheetas`와 같은 상태로 돌아간다.
    - 예를 들어, 추가한 것이 있으면 삭제하고, 변경한 것이 있으면 그걸 반대로 수행한다.

### revert가 필요한 이유

- `reset`과 달리 작성했던 내역들을 기록으로 남길 필요가 있을 때 이 방식을 사용한다.
  - 내역들은 그대로 유지하되 예를 들어 `Replace Lions with Leopards`에서 실행했던 내용만 취소하는 경우
  - 이후 내역들은 유지하면서 돌아갈 내역만 콕 집어서 되돌릴 수 있다.
  - 개발자들은 Git을 사용해서 코드를 공유하고 협업하는데 한 번 공유공간에 올라간 내역을 `reset`해버리면 협업 시 문제가 발생하므로 지워진 히스토리 내역을 기반으로 작업한 다른 사람들의 코드와 심각한 충돌을 일으키게 되기 때문에 한 번 공유가 된 코드들은 `revert`를 이용해서 되돌리는 것이 좋다.

### `reset` 사용해서 과거로 돌아가기

#### 실습 전 내역 백업

- .git 폴더 다른 폴더에 복사해두기 -> `reset` 실습 종료 후 다시 해당 폴더로 복원
- .git 폴더 없앤 다음 git 상태 확인해보기

#### `reset` 명령어 사용

- 아래 명령어로 커밋 내역 확인하기
  ```bash
  git log
  ```
  - 되돌아갈 시점: `Add team Cheetas`의 커밋 해시를 복사한다.
  - :q로 빠져나오기
- `reset` 하기

  ```bash
  git reset --hard (돌아갈 커밋 해시)
  ```

  - reset의 옵션(--hard 등)은 섹션 5에서 다룰 것!
  - 파일만 봐도 `cheetas.yaml` 생긴 것 -> `Add team Cheetas` 상태로 돌아간 것을 확인할 수 있다.

#### `reset`하기 전 시점으로 복원

- 백업해 둔 `.git` 폴더로 변경
  - `git log`, `git status`로 상태 확인
  - deleted 목록: leopards.yaml, panthers.yaml
  - modified 목록: tigers.yaml
  - untracked files 목록: lions.yaml
  - 해당 폴더에 대한 깃은 가장 커밋한 내역까지 적용되어야 하는데 그렇지 못해 변경, 삭제 등에 있는 것을 확인할 수 있다.
- 아래 명령ㅇ로 현 커밋 상태로 초기화한다.
  ```bash
  git reset --hard
  ```
  - <b>뒤에 커밋 해시가 없으면 마지막 커밋을 가리킨다.</b>
  - `lions.yaml` 삭제해주도록 하자.

### `revert`로 과거의 커밋 되돌리기

- 아래 명령어로 revert
  ```bash
  git revert (되돌릴 커밋 해시)
  ```
  - :wq로 커밋 메시지 저장
