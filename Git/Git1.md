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
  - [Git에게 맡기지 않는 것들](#git에게-맡기지-않는-것들)
    - [Git의 관리에서 틀정 파일/폴더를 배제해야 할 경우](#git의-관리에서-틀정-파일폴더를-배제해야-할-경우)
    - [.gitignore 사용해보기](#gitignore-사용해보기)
    - [.gitignore 형식](#gitignore-형식)
- [02. 시간 여행하기](#02-시간-여행하기)
  - [변화를 타임 캡슐에 묻기](#변화를-타임캡슐에-담아-묻기)
    - [프로젝트의 변경사항들을 타임캡슐(버전)에 담기](#프로젝트의-변경사항들을-타임캡슐버전에-담기)
    - [타임캠슐 묻기](#타임캠슐-묻기)
    - [커밋 메시지와 함께 작성하기](#커밋-메시지와-함께-작성하기)
  - [다음 변경사항들을 만들고 타임캡슐에 묻기1](#다음-변경사항들을-만들고-타임캡슐에-묻기1)
    - [변경사항](#변경사항)
    - [캡슐에 담기](#캡슐에-담기)
  - [다음 변경사항들을 만들고 타임캡슐에 묻기2](#다음-변경사항을-만들고-타임캡슐에-묻기2)
  - [과거로 돌아가는 두 가지 방법 및 실습](#과거로-돌아가는-두-가지-방법-및-실습)
    - [Git에서 과거로 돌아가는 두 가지 방식](#git에서-과거로-돌아가는-두-방식)
    - [revert가 필요한 이유](#revert가-필요한-이유)
    - [reset 사용해서 과거로 돌아가기](#reset-사용해서-과거로-돌아가기)
    - [revert로 과거의 커밋 되돌리기](#revert로-과거의-커밋-되돌리기)
    - [Replace Lions with Leopards로 revert 시 문제](#replace-lions-with-leopards로-revert-시-문제)
- [03. 차원 넘나들기](#03-차원-넘나들기)
  - [여러 branch 만들어보기](#여러-branch-만들어보기)
    - [Branch](#branch)
    - [브랜치 생성/이동/삭제하기](#브랜치-생성--이동--삭제하기)
  - [각각의 브랜치에서 서로 다른 작업해보기](#각각의-브랜치에서-서로-다른-작업해보기)
    - [main 브랜치](#main-브랜치)
    - [add-coach 브랜치](#add-coach-브랜치)
    - [new-teams 브랜치](#new-teams-브랜치)
    - [결과 살펴보기](#결과-살펴보기)
  - [branch 합치기](#branch)
    - [서로 다른 branch를 합치는 두 가지 방법](#서로-다른-branch를-합치는-두-가지-방법)
    - [merge로 합치기](#merge로-합치기)
    - [rebase로 합치기](#rebase로-합치기)
  - [충돌 해결하기](#충돌-해결하기)
    - [상황 만들기](#상황-만들기)
    - [merge 충돌 해결하기](#merge-충돌-해결하기)
    - [rebase 충돌 해결하기](#rebase-충돌-해결하기)
- [04. GitHub 사용하기](#github-사용하기)
  - [가입하고 토큰 만들기](#가입하고-토큰-만들기)
  - [원격 저장소 사용하기](#원격-저장소-사용하기)
    - [로컬에 원격 저장소 추가 후 푸시](#로컬에-원격-저장소-추가-후-푸시)
    - [GitHub의 해당 레포지토리 페이지 새로고침하여 살펴보기](#github의-해당-레포지토리-페이지-새로고침하여-살펴보기)
    - [GitHub에서 프로젝트 다운받기](#github에서-프로젝트-다운받기)
  - [push와 pull](#push와-pull)
    - [원격으로 커밋 밀어올리기(`push`)](#원격으로-커밋-밀어올리기push)
    - [원격의 커밋 당겨오기(`pull`)](#원격의-커밋-당겨오기pull)
    - [pull할 것이 있을 때 push를 하면?](#pull할-것이-있을-때-push를-하면)
    - [협업상 충돌 발생 해결하기](#협업상-충돌-발생-해결하기)
    - [로컬의 내역 강제 push해보기](#로컬의-내역-강제-push해보기)
  - [원격의 브랜치 다루기](#원격의-브랜치-다루기)
    - [로컬에서 브랜치 만들어 원격에 push 해보기](#로컬에서-브랜치-만들어-원격에-push-해보기)
    - [원격의 브랜치 로컬에 받아오기](#원격의-브랜치-로컬에-받아오기)
    - [원격의 브랜치 삭제](#원격의-브랜치-삭제)
- [05. Git 보다 깊이 알기](#05-git-보다-깊이-알기)
  - [Git의 3가지 공간](#git의-3가지-공간)
    - [Working directory](#working-directory)
    - [Staging area](#staging-area)
    - [Repository](#repository)
    - [그릇에 비유한 Git 개념](#그릇에-비유한-git-개념)
  - [파일의 삭제와 이동](#파일의-삭제와-이동)
    - [git rm](#git-rm)
    - [git mv](#git-mv)
    - [파일을 staging area에서 working directory로](#파일을-staging-area에서-working-directory로)
    - [reset의 세 가지 옵션](#reset의-세-가지-옵션)
  - [HEAD](#head)
    - [Git의 HEAD](#git의-head)
    - [checkout으로 앞뒤 이동해보기](#checkout으로-앞뒤-이동해보기)
    - [HEAD 사용하여 reset하기](#head-사용하여-reset하기)
  - [fetch vs pull](#fetch-vs-pull)
- [06. Git 보다 잘 활용하기](#06-git-보다-잘-활용하기)
  - [Help와 문서 활용하기](#help와-문서-활용하기)
    - [git help](#git-help)
    - [Git 문서](#git-문서)
  - [Git의 각종 설정](#git의-각종-설정)
    - [global 설정과 local 설정](#global-설정과-local-설정)
    - [설정값 확인](#설정값-확인)
    - [유용한 설정들](#유용한-설정들)
    - [단축키 설정](#단축키-설정)
- [07.]

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

# 02. 시간 여행하기

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

#### `git status`로 확인

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
2. Leopards의 manager를 Luke -> Nora로 수정
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
  - 해당 폴더에 대한 깃은 가장 커밋한 내역(`Replace Cheetas with Panthers`)까지 적용되어야 하는데 파일 내용이 그렇지 못해 변경, 삭제 등에 있는 것을 확인할 수 있다.
- 아래 명령ㅇ로 현 커밋 상태로 초기화한다.
  ```bash
  git reset --hard
  ```
  - <b>뒤에 커밋 해시가 없으면 마지막 커밋을 가리킨다.</b>
  - `lions.yaml` 삭제해주도록 하자.
    - 해당 파일은 Git의 관점에서 관리된 적이 없는 파일(`untracked file`)이기 때문이다.

### `revert`로 과거의 커밋 되돌리기

- 아래 명령어로 revert
  ```bash
  git revert (되돌릴 커밋 해시)
  ```
  - `Add George to Tigers`의 <b>커밋 해시</b>로 revert
  - :wq로 커밋 메시지 저장
- 실행 결과
  ```
  o Revert "Add George to Tigers"
  o Replace Cheetas with Panthers
  o Add team Cheetas
  o Add George to Tigers
  o Replace Lions with Leopards
  o FIRST COMMIT
  ```
  - `Revert "Add George to Tigers"`라는 커밋이 생긴 것을 확인할 수 있다.
    - 그냥 내역을 삭제해버리는 `reset`과는 달리 `revert`는 내가 무엇을 취소했는지 내역에 남는다.
    - 따라서 협업 시에는 `revert` >>>>>>>> `reset`
  - 그리고 `Add George to Tigers`에서는 George를 더했는데 `Revert`한다면 George를 삭제하는 반대되는 커밋 내용을 확인할 수 있다.
    - <b>revert는 해당 커밋 상태의 반대되는 작업을 수행한다고 생각하면 될 것 같다.</b>

### Replace Lions with Leopards로 revert 시 문제

- `Replace Lions with Leopards`에서
  - `leopards.yaml`을 생성
  - `lions.yaml`을 삭제
  - `tigers.yaml`에서 manager 이름을 John -> Donal로 변경
- <b>하지만 이후 leopards.yaml에서 수정한 내역 때문에 충돌</b>
  - 이 작업 내역은 `Replace Cheetas with Panthers`의 커밋 내역에 있다.
    - Manager 이름은 Luke -> Nora로 변경한 내역
  - 따라서 이후에 작업한 내역이 있어 충돌을 일으킨다.

#### 해결 방법

```bash
git rm leopard.yaml
git revert --continue
```

- `git rm leopards.yaml`로 Git에서 해당 파일 삭제
- `git revert --continue`로 마무리
- `:wq`로 커밋 메시지 저장
  - `Revert "Replace Lions with Leopards"`이 가장 최근 커밋내역으로 생성된다.
    - `leopards.yaml`을 삭제 <- 어떻게 보면 git rm으로 물리적으로 삭제해서 충돌 오류 해결
    - `lions.yaml` 생성
    - `tigers.yaml`에서 manager 이름 Donal -> John

#### revert 사용해서 revert 전으로 되돌아가기

```bash
git reset --hard (해시코드)
```

#### 커밋하지 않고 revert하기

```bash
git revert --no--commit (되돌릴 커밋 해시)
```

- 원하는 다른 작업을 추가한 다음 함께 커밋하고 싶을 때 사용한다.
- 취소하려면 `git reset --hard`로 가장 최근 커밋한 상태로 되돌아 간다.

# 03. 차원 넘나들기

## 여러 branch 만들어보기

### Branch

- 분기된 가지(다른 차원)
- 프로젝트를 하나 이상의 모습으로 관리해야 할 때
  - ex) 실배포용, 테스트서버용, 새로운 시도용
- 여러 작업들이 각각 독립되어 진행될 떄
  - ex) 신기능 1, 신기능 2, 코드개선, 긴급수정..
  - 각각의 차원에서 작업한 뒤 확정된 것을 메인 차원에 통합
- <b>이 모든 것을 `하나의 프로젝트 폴더`에서 진행할 수 있도록!</b>

### 브랜치 생성 / 이동 / 삭제하기

- 각 파일에 manager, members만 있기 때문에 coach를 더하기 위한 실험적 기능을 하는 branch 추가

```bash
git branch add-coach
git branch
git switch add-coach
```

- `git branch add-coach`: `add-coach`란 이름의 브랜치 생성
- `git branch`: 브랜치 목록 확인
- `git switch add-coach`: `add-coach` 브랜치 이동
  - `checkout` 명령어가 Git 2.23 버전부터 `switch`, `resotre`로 분리됨
    - checkout이 하는 일이 너무 다양해서 용도별로 분리함
    - 브랜치 간 이동: `switch`

#### 브랜치 생성과 동시에 이동하기

```bash
git switch -c new-teams
```

- 기존의 `git checkout -b (새 브랜치명)`

#### 브랜치 삭제하기

```bash
git branch -d (삭제할 브랜치명)
git branch -D (강제삭제할 브랜치명)
```

- 지워질 브랜치에만 있는 내용의 커밋이 있을 경우 즉, 다른 브랜치로 가져오지 않은 내용이 있는 브랜치를 지울 때는 `-d` 대신 `-D`로 강제 삭제해야 한다.
- `merge`나 `rebase`가 된 브랜치의 경우는 즉 해당 브랜치의 사항들이 전부 다른 브랜치로 적용되어 있기 때문에 삭제할 때 `-d`로만 해서 가능하지만,
- `merge`나 `rebase`되지 않은 브랜치는 필요한 브랜치를 실수로 삭제하는 것을 방지하기 위해 기본적으로 막는다.

#### 브랜치 이름 바꾸기

```bash
git branch -m (기존 브랜치명) (새 브랜치명)
```

## 각각의 브랜치에서 서로 다른 작업해보기

### main 브랜치

- Leopards의 `members`에 `Olivia` 추가
  - 커밋 메시지: `Add Olivia to Leopards`
- Panthers의 `members`에 `Freddie` 추가
  - 커밋 메시지: `Add Freddie to Panthers`

### add-coach 브랜치

- 🚨 주의사항 🚨

  - coach와 manager 사이에 한 줄 공백이 있도록 설정
  - 이후의 실습에서 사소한 차이로 충돌이 발생할 수도 있다.

- Tigers의 매니저 정보 아래 `coach: Grace` 추가
  - 커밋 메시지: `Add Coach Grace to Tigers`
- Leopards의 매니저 정보 아래 `coach: Oscar` 추가
  - 커밋 메시지: `Add Coach Oscar to Leopards`
- Panthers의 매니저 정보 아래 `coach: Teddy` 추가
  - 커밋 메시지: `Add Coach Teddy to Panthers`

### new-teams 브랜치

- `pumas.yaml` 추가

  - 커밋 메시지: `Add team Pumas`

  ```yaml
  team: Pumas

  manager: Jude

  members:
    - Ezra
    - Carter
    - Finn
  ```

- `jaguars.yaml` 추가

  - 커밋 메시지: `Add team Jaguars`

  ```yaml
  team: Jaguars

  manager: Stanley

  members:
    - Caleb
    - Harvey
    - Myles
  ```

### 결과 살펴보기

- `git log`: 위치한 브랜치에서의 내역만 볼 수 있음
- 여러 브랜치의 내역 편리하게 보기
  ```bash
  git log --all --decorate --oneline --graph
  ```
- 소스트리로 확인하면 브랜치가 세 가지로 나뉜 것을 확인할 수 있다.

```
o        'new-teams' Add team Jaguars
|
o        Add team Pumas
|
|  o     'add-coach' Add Coach Teddy to Panthers
|  |
|  o     Add Coach Oscar to Leopards
|  |
|  o     Add Coach Grace to Tigers
|  |
|  |  o  'main' Add Freddie to Panthers
|  |  |
|  |  o  Add Olivia to Leopards
| /  /
o        Replace Cheetas with Panthers
o        Add team Cheetas
```

## branch 합치기

```
      / o - o - o  <- 'add-coach'      \ (merge, add-coach)
- o - o - o <- 'main'                  - o     ( - o - o)
      \ o - o <- 'new-teams'                   (rebase, new-teams 브랜치 사라짐)
```

### 서로 다른 branch를 합치는 두 가지 방법

- `merge`: <b>두 브랜치를 한 커밋에 이어붙인다.</b>
  - 브랜치 사용내역을 남길 필요가 있을 때 적합한 방식이다.
  - 다른 형태의 merge에 대해서도 이후 다루게 될 것이다.
  - 새로 생기는 커밋에는 원래 브랜치(main)에 병합될 브랜치(add-coach)에서 작업했던 모든 변화들이 한꺼번에 적용한다.
- `rebase`: 브랜치를 다른 브랜치에 이어붙인다.
  - 한 줄로 깔끔히 정리된 내역을 유지하기 원할 때 적합하다.
  - 이미 팀원과 공유된 커밋들에 대해서는 사용하지 않는 것이 좋다.
  - 브랜치의 마디, 커밋들(new-teams)을 대상 브랜치(main)로 옮겨붙인다.
    - 마치 메인 브랜치에다가 new-teams 브랜치의 커밋들을 하나하나 추가한 것처럼 된다.
- `merge`나 `rebase`하거나 둘 결과물은 같은 것 아닌가?
  - 결국 모든 브랜치에서의 작업 결과물이 마지막에 모이는 것이기 때문에 같은 것 아닌가?
  - 차이가 있다면 <b>히스토리, 내역</b>
    - rebase를 한 뒤의 히스토리는 깔끔하게 한 줄로 정리되지만,
    - merge는 위 예시처럼 브랜치의 흔적을 남긴다.
      - 많은 브랜치가사용되는 프로젝트에서는 프로젝트의 진행 내역들을 보고 파악하기가 매우 복잡해질 수 있다.
  - 브랜치의 사용 내역들을 남겨둘 필요가 있다면 `merge`
  - 그 보다는 히스토리를 깔끔하게 만드는게 중요하다면 `rebase`가 적절한 선택이다.
    - 이미 팀원들 간에 공유된 커밋들에 대해서는 `rebase`를 사용하지 않는 것이 좋다.
    - 같이 일 하는 도중 공유된 커밋에 한 줄로 일이 틀어질 소지가 될 수도 있다.

### `merge`로 합치기

- `add-coach` 브랜치를 `main` 브랜치로 <b>merge</b>
  - 주 브랜치인 `main` 브랜치로 이동
  - 아래의 명령어로 병합
  ```bash
  git merge add-coach
  ```
  - `:wq`로 자동입력된 커밋 메시지 저장하여 마무리
  - 소스트리에서 확인
- 결과
  - `3 files changed, 6 insertions(+)` 메시지를 볼 수 있다.
  - coach가 `main`에 적용된 것을 확인할 수 있다.

#### `merge`는 `reset`으로 되돌리기 가능

- `merge`도 하나의 커밋
- `merge`하기 전 해당 브랜치의 마지막 시점으로

### 병합된 브랜치는 삭제

- 삭제 전 소스트리에서 `add-coach` 위치 확인

```bash
git branch -d add-coach
```

### `rebase`로 합치기

- `new-teams` 브랜치를 `main` 브랜치로 <b>rebase</b>

  - `new-teams` 브랜치로 이동
    - `merge`때와는 반대와는 반대로 `new-teams`에서 `main`을 활용한다.
  - 아래의 명령어로 병합

  ```bash
  git rebase main
  ```

  - 소스트리에서 상태 확인

    - 🚨 `main` 브랜치는 뒤쳐져 있는 상황 🚨

    ```
    - o - o - o - o
             main   new-teams(new-teams가 두 작업 앞 선 상황)

    main은 rebase한다고 해서 그 가지의 끝까지 가지 않는다.
    ```

- `main` 브랜치로 이동 후 아래 명령어로 `new-teams`의 시점으로 <b>fast-forward</b>하여 해결
  ```bash
  git merge new-teams
  ```
  ```
               main
  - o - o - o - o
             new-teams
  ```
  - `new-teams` 브랜치 삭제 -> `git branch -d new-teams`

## 충돌 해결하기

> 같은 파일의 같은 줄의 서로 다른 내용을 입력된 상황  
> 컴퓨터는 둘 중 어느 것을 채택해야 할 지 모르기 때문에 충돌이 발생한다.

### 상황 만들기

- `conflict-1`, `conflict-2` 브랜치 생성
- `main` 브랜치
  - Tigers의 `manager`를 `Kenneth`로 변경
  - Leopards의 `coach`를 `Nicholas`로 변경
  - Panthers의 `coach`를 `Shirley`로 변경
  - 커밋 메시지: `Edit Tigers, Leopards, Panthers`
- `conflict-1` 브랜치
  - Tigers의 `manager`를 `Deborah`로 변경
  - 커밋 메시지: `Edit Tigers`
- `coflict-2` 브랜치 1차
  - Leopards의 `coach`를 `Melissa`로 변경
  - 커밋 메시지: `Edit Leopards`
- `conflict-2` 브랜치 2차
  - Panthers의 `coach`를 `Raymond`로 변경
  - 커밋 메시지: `Edit Panthers`

### `merge` 충돌 해결하기

`git merge conflict-1`로 병합을 시도하면 충돌 발생

- 오류 메시지와 `git status` 확인
  - 오류 메시지: Merge conflict in tigers.yaml
- VS Code에서 해당 부분 확인(VS Code의 기능 중 하나)
  ```
  <<<<<<< HEAD
  manager: Kenneth
  =======
  manager: Deborah
  >>>>>>> conflict-1
  ```
  - 이전 VS Code에서는 해당 충돌 부분 위에 선택 가능한 버튼들이 있었는데 현재 버전에서는 나타나지 않는다.
  - 충돌시 직접 해당 부분을 직접 타이핑해서 수정한 다음 `merge`를 계속 진행하면 된다.
  - `manager: Deborah`만 남기고 `git add .` -> `git commit` -> `:wq` 순서로 명령하면 `Merge branch 'conflict-1'` 커밋 생긴다.
- 당장 충돌 해결이 어여울 경우 아래 명령어로 `merge` 중단
  ```bash
  git merge --abort
  ```
  - 해결 가능 시 충돌 부분을 수정한 뒤 `git add .`, `git commit`으로 병합 완료

### `rebase` 충돌 해결하기

- `conflict-2`에서 `git rebase main`로 리베이스 시도하면 충돌 발생
  - 오류 메시지와 `git status` 확인
    - Unmerged paths: `both modified: leopards.yaml` 메시지 확인할 수 있다.
    - 이러한 오류는 개발자 본인이 충돌나는 부분을 해결하라는 메시지!
  - VS Code에서 해당 부분 확인
- 당장 충돌 해결이 어려울 경우 아래 명령어로 `rebase` 중단
  ```bash
  git rebase --abort
  ```

#### 해결 가능 시

- 충돌 부분을 수정한 뒤 `git add .`

  - 아래 명령어로 계속

  ```bash
  git rebase --continue
  ```

  - 한 번으로 끝나지 않을 수 있기 때문에 해당 명령어 실행
  - 충돌이 모두 해결될 때까지 반복

- `main`에서 `git merge conflict-2`로 마무리(main은 뒤쳐져 있기 때문에)
- `conflict-1`, `conflict-2` 삭제
  ```
  o     "conflict-2" Edit Leopards
  |
  o     "main" Merge branch 'conflict-1'
  | \
  |  o  "conflict-1" Edit Tigers
  o  |  Edit Tigers, Leopards, Panthers
  | /
  o     Add team Jaguars
  ```
  - <b>두 마디짜리 브랜치를 rebase 했는데 결과에는 왜 한 마디만 추가되어 있을까?</b>
    - 충돌 해결 중 두 번째 것에서는 current, 즉 main 브랜치 것(Shirley)을 채택했기 때문에 (즉, rebase가 의미가 없어졌으므로) 커밋으로 추가할 필요가 없어졌기 때문이다.
    - 만약 conflict-2 브랜치 것을 채택한다면 가지는 두 개 생긴다.

# GitHub 사용하기

### [github.com](https://www.github.com) 살펴보기

- Git으로 관리되는 프로젝트의 원격 저장소
  - Git으로 관리하는 모든 프로젝트들을 온라인 공간에 공유해서 프로젝트 구성원들이 함꼐 소프트웨어를 만들어갈 수 있도록 도와주는 서비스
- 일반 클라우드와 깃헙 차이
  - 일반 클라우드
    - 구성원들이 한 번에 한 명씩만 작업을 해서 업로드하는 경우라면 문제가 없지만, 그렇게 되면 팀원이 많은 것이 의미가 없다.
  - 깃헙 등의 온라인 Git 저장소
    - 모든 업로드와 다운로드를 커밋 단위로 주고 받는다.
    - 모든 팀원들이 같은 시간에 동시에 작업을 할 수 있도록 지원하는데 한 사람이 버전을 최신화(커밋)하면 다음 사람이 완료된 작업을 커밋해서 올리기 위해서는 반드시 최신 커밋을 먼저 다운받고 자기 컴퓨터에 적용부터 하도록 강제된다.
    - 커밋 상에 충돌사항이 있다면 그것도 자기 컴퓨터에서 해결!
  - 즉, GitHub가 교통정리를 하면서 서로의 작업을 덮어씌우는 등의 문제를 방지하면서 협업을 할 수 있도록 도와준다.
- 오픈소스의 성지
  - Git, VS Code, Tensorflow, React 등 살펴보기

## 가입하고 토큰 만들기

- `Sign Up`으로 가입 후 로그인
- `Personal access token` 만들기
  - 우측 상단의 프로필 - `Settings`
  - `Developer Settings`
  - `Personal access tokens` - `Generate new token`
  - `repo` 및 원하는 기능에 체크, 기간 설정 뒤 `Generate token`
  - 토큰 안전한 곳에 보관해 둘 것
- 토큰 컴퓨터에 저장하기
  - 윈도우 가이드
    - `Windows 자격 증명 관리자`
    - `Windows 자격 증명` 선택
    - `git:https://github.com` 자격 정보 생성
    - 사용자명과 토큰 붙여넣기
  - [맥 가이드(링크)](https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain)
    - `Keychain Access` 앱 실행
    - `github`의 `인터넷 암호` 항목 선택
    - 사용자명(`계정` 칸)과 토큰(`암호 보기` 누른 뒤 오른쪽 칸) 붙여넣기
    - 맥에서 `Keychain Access`에 `github` 항목이 없다면?
      - 아직 맥에서(GitHub 사이트가 아닌 터미널 등에서) Github 로그인을 해보지 않은 경우
      - 그대로 다음 강을 진행하면 `push` 명령어 사용시 터미널에서 토큰을 요구할 것
      - 그 때, 토큰을 입력하면 키체인에 해당 항목이 생기고 토큰도 자동등록될 것이다.
  - 소스트리에도 추가(맥에서 소스트리에 계정 설정하기)
    - `설정` > `계정` 탭 > `추가` 버튼
    - 인증방식은 `베이직`, 프로토콜은 `HTTPS`로 설정
    - 사용자명(GitHub 아이디)와 암호(토큰) 설정
    - 해당 사이트 참조: [맥에서 소스트리에 계정 설정](https://www.yalco.kr/@git-github/4-2/)
  - GitHub에 새 <b>Repository</b> 생성
    - `Public`: 모두에게 보일 수 있는 프로젝트
    - `Private`: 허용된 인원만 볼 수 있는 프로젝트
  - 협업할 팀원 추가
    - 레포지토리의 `Settings` - `Collaborators`
      - `Manage Access`가 `Collaborators`로 바뀌었다.
    - `Add people`

## 원격 저장소 사용하기

### 로컬에 원격 저장소 추가 후 푸시

- 이 섹션에서 <b>HTTPS</b> 프로토콜 사용

#### GitHub 레포지토리 생성 후 복붙 명령어

```bash
git remote add origin (원격 저장소 주소)
```

- git의 `remote` 즉, 원격 저장소 중 하나인 `origin`에 해당 주소를 추가(`add`)하겠다는 명령어
- 로컬의 Git 저장소에 원격 저장소로의 연결 추가
  - 원격 저장소 이름에 흔히 `origin` 사용. 다른 것으로 수정 가능.

```bash
git branch -M main
```

- GitHub 권장 - 기본 브랜치명을 `main`으로

```bash
git push -u origin main
```

- git에서 `push`는 내 컴퓨터에 있는 커밋 내역들 중에 아직 원격 저장소에 없는 것들을 업로드해줌
- 로컬 저장소의 커밋 내역들 원격으로 `push`(업로드)
- `-u` 또는 `--set-upstream`: 현재 브랜치와 명시된 원격 브랜치 기본 연결
  - `-u origin main`: 어느 원격의 어느 브랜치에다가 `push`할 것인가를 `-u` 뒤에 설정한다.
  - 명시해주는 이유: 한 프로젝트 안에서 원격 저장소를 여러 개 둘 수 있기 때문이다.
  - `git remote (-v)`: 원격의 목록을 확인할 수 있는 명령어

### GitHub의 해당 레포지토리 페이지 새로고침하여 살펴보기

- 파일들 내용
- 커밋 내역들
- 원격 목록 보기
  ```bash
  git remote
  ```
  - 자세히 보기: `git remote -v`
- 원격 지우기(로컬 프로젝트와의 연결만 없애는 것. GitHub의 레포지토리는 지워지지 않음)
  `git remote remove (origin 등 원격 이름)`

### GitHub에서 프로젝트 다운받기

- `Download ZIP`: 파일들만 다운받음, Git 관리내역 제외
  - 협업할 때 사용하는 방법은 아님
- `git clone`: Git 관리내역 포함 다운로드

#### 터미널이나 Git Bash에서 대상 폴더 이동후

```bash
git clone (원격 저장소 주소)
```

- 이 섹션에서는 <b>HTTPS</b> 프로토콜 사용
- VS Code로 해당 폴더 열어보기

## push와 pull

### 원격으로 커밋 밀어올리기(`push`)

- Leopards의 `members`에 `Evie` 추가
  - 커밋 메시지: `Add Evie to Leopards`
  ```
  o  "main(1개 앞)" Add Evie to Leopards
  |
  o  "origin/main" Merge branch 'conflict'
  ```
  - 원격(`origin`)에 있는 `main` 브랜치는 하나가 뒤쳐진 상황
- 아래 명령어로 push
  ```bash
  git push
  ```
  - 💡 이미 `git push -u origin main`으로 대상 원격 브랜치가 지정되었기 때문에 가능!
- GitHub 페이지에서 확인
  - GitHub의 파일들과 커밋 내역 확인

### 원격의 커밋 당겨오기(`pull`)

- GitHub에서 Leopards의 `members`에 `Dongho` 추가
  - 커밋 메시지: `Add Dongho to Leopards`
- 아래 명령어로 pull
  ```bash
  git pull
  ```
- 로컬에서 파일과 로그 살펴보기

### `pull`할 것이 있을 때 `push`를 하면?

- 자신의 커밋은 깃헙에 올리가지 않은 상태이고, 다른 팀원들은 커밋을 올려 pull을 받아야 하는 상황

- 로컬에서 Leopards의 `manager`를 `Dooli`로 수정
  - 커밋 메시지: `Edit Leopards manager`
- GitHub에서 Leopards의 `coach`를 `Lupi`로 수정
  - 커밋 메시지: `Edit Leopards coach`
- push 해보기
  - 원격에 먼저 적용된 새 버전이 있으므로 적용 불가
    - 현재 자신의 깃 저장소는 원격저장소보다 뒤쳐져 있기 때문에 원격 저장소에 push하기 위해서는 자신의 내역이 원격 저장소의 최신내역과 맞춰져있어야 한다.
  - pull 해서 원격의 버전을 받아온 다음 push 가능

#### `push`할 것이 있을 시 `pull`하는 두 가지 방법

- `git pull --no-rebase` <= `merge` 방식
- 소스트리에서 확인해보기
  ```
  o      "main" Merge branch 'main' of https;//github.com/.../git-practice
  | \
  |  o   "origin/main" Edit Leopards coach
  o  |   Edit Leopards manager
  | /
  o     Add Evie to Leopards
  ```
  - 로컬 브랜치(main)와 원격 저장소(origin/main)을 어긋난 시간선을 다르게 보고 두 갈래로 나뉜 후 모아준다.
  - 그리고 `merge` 방식이므로 main 브랜치의 leopards.yaml에 `manager: Dooli`와 `coach: Lupi`로 변경됨
- `git pull --rebase` - `rebase` 방식
  - 로컬의 main 브랜치 뒤에 원격 저장소(origin)의 main 브랜치가 뒤로 와서 한 줄이 된다.
  - `pull` 상의 `rebase`는 다름(협업시 사용 OK)
  ```
  o "main" Edit Leopard manager
  |
  o "origin/main" Edit Leopard coach
  |
  o Add Evie to Leopards
  ```
- push하기

#### 이 부분에서 충돌이 발생했다면?

- manager 줄과 coach 줄 사이에 빈 줄이 하나 있는지 확인해야 한다.
  - <b>Git은 같은 파일의 같은 부분에 양쪽에서 수정사항이 있을 때 이를 충돌로 인식한다.</b>
  ```
  ...
  manager: Dooli
  (빈 줄 - 윗부분과 아랫부분을 나눠주는 경계가 됨)
  coach: Lupi
  ...
  ```
  - 빈 줄을 넣으면 이것이 manager 부분과 coach 부분의 경계로 작용하지만 이들을 붙여서 넣으면 <b>한 부분으로 인식</b>되어 충돌로 분류되는 것이다.

### 협업상 충돌 발생 해결하기

- 로컬에서 Panthers에 `Maruchi` 추가
  - 커밋 메시지: `Add Maruchi to Panthers`
- 원격에서 Panthers에 `Arachi` 추가
  - 커밋 메시지: `Add Arachi to Panthers`
- pull하여 충돌상황 마주하기
  - `--no-rebase`와 `--rebase` 모두 해 볼 것
    - `--no-rebase`경우는 충돌하는 둘 중 하나를 선택하여 두 가지에서 하나로 모인다.
    - `--rebase` 경우는 원격 저장소(origin)의 main브랜치 것(Arachi)을 선택하면 커밋이 하나만 추가된다.
      ```
      o "main" "origin/main" Add Arachi to Panthers
      |
      ```
      - 로컬의 main 브랜치 것은 필요없어지기 때문에 사라졌다고 보면 된다.
    - 로컬의 main 브랜치 것(Maruchi)를 선택하면 커밋이 두 개 생긴다.
      ```
      o "main" Add Maruchi to Panthers
      |
      o "origin/main" Add Arachi to Panthers
      ```

### 로컬의 내역 강제 push해보기

- 로컬의 커밋 내역들이 원격 저장소의 커밋 내역보다 뒤쳐져 있는 경우에는 push할 수 없지만,
- 원격에 올라간 내역들이 뭔가 잘못돼서 로컬에 있는 것들로 강제로 맞춰줄 때에는 강제로 맞춰줄 수 있다.
  - 이 떄, 원격 저장소에 있는 커밋 내역들은 사라진다.
  - 협업할 때 합의안되면 쓰면 안된다.

1. 로컬의 내역 충돌 전으로 `reset`
2. 아래 명령어로 원격에 강제 적용

```bash
git push --force
```

## 원격의 브랜치 다루기

### 로컬에서 브랜치 만들어 원격에 push 해보기

- `from-local` 브랜치 만들기
- 아래 명령어로 원격에 `push`

  ```bash
  git push
  ```

  - `git push --set-upstream origin from-local`와 같이 대상을 명시하라는 메시지가 뜬다.
    - git이 `from-local` 브랜치를 어디에다가 `push`해야하는지 모르기 때문에 에러 발생
    - 그래서 `origin`이라는 원격에 `from-local`이라는 브랜치를 만들라는 의미의 메시지
    - `--set-upstream`을 `-u`으로 축약 가능

- 아래 명령어로 원격의 브랜치 명시 및 기본설정
  ```bash
  git push -u origin from-local
  ```
  - 원격 저장소인 GitHub에 from-local 브랜치가 올라온 것을 확인할 수 있다.
- 로컬과 원격의 브랜치 목록 확인하기
  ```bash
  git branch --all
  git branch -a
  ```
  - GitHub에서 목록 보기
  - `git branch`는 로컬의 브랜치만 볼 수 있다.

### 원격의 브랜치 로컬에 받아오기

- GitHub에서 `from-remote` 브랜치 만들기
  - 로컬의 git이 원격의 변화들을 업데이트받지 않았기 때문에 `git branch -a`에서 현재는 보이지 않는다.
- 아래 명령어로 원격의 변경사항 확인
  ```bash
  git fetch
  ```
  - `git branch -a`로 확인
- 아래 명령어로 로컬에 같은 이름의 브랜치를 생성하여 연결하고 `switch`
  ```bash
  git switch -t origin/from-remote
  ```
  - 로컬로 `from-remote`라는 브랜치를 복사한 다음에 이후로도 계속 로컬의 `from-remote` 브랜치는 원격 저장소와 연결하는 명령어
  - `git push -u`하는 것과 비슷한 개념

### 원격의 브랜치 삭제

```bash
git push (원격 이름) --delete (원격의 브랜치명)
```

# 05. Git 보다 깊이 알기

## Git을 특별하게 만드는 것

- <b>스냅샷</b>을 사용한다.
  - [관련 공식문서 내용](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EA%B8%B0%EC%B4%88)
  - SVN 등: 델타 방식
    - 각 파일이 생겨난 버전에 해당 파일 전체가 저장이 되고 이후 이 파일에 수정이 가해질 때는 그 변경점들이 저장된다.
    - 해당 버전의 파일의 내용은 이전 변화들을 누적해서 계산이 된다.
  - Git: 스냅샷 방식
    - 새로운 버전이 만들어질 때 해당 버전에서의 각 파일이, 최종 상태 그대로 저장하는 방식
    - 이전 버전에서부터 변화가 없는 파일은 이전 버전의 파일 그대로 연결해서 가져온다.
    - 변화가 있는 파일의 경우 최종 파일 내용이 그대로 저장이 된다.
  - 커밋이 몇 만개있는 레포지토리를 델타 방식으로 다룬다면
- 중앙집중식 버전 관리가 아닌 <b>분산 버전 관리</b>이다.
  - 중앙집중식 버전 관리
    - CVS나 Subversion 등의 VCS는 원격 서버에 모든 관리 내역들이 저장된다.
    - 그리고 여기에 참여하는 인원들의 컴퓨터 즉 로컬에는 중앙에서 현 버전 것으로 다운받는 파일들로만 작업을 할 수 있다. -> 원격 저장소에 의존적
  - 분산 버전 관리
    - 원격에 있는 것을 ZIP 다운로드 말고 clone 명령어를 써가지고 받아오면
    - 로컬에 파일들 뿐만 아니라 전체 Git 커밋이랑 브랜치들까지 받아져가지고 인터넷 연결상태랑 상관없이 로컬에서 자유롭게 작업을 할 수 있다.

## Git의 3가지 공간

> Git에서는 파일의 상태를 3가지로 분류한다.

```
"Working directory"      "Staging area"       "Repository"
    Untracked
                   add =>            commit =>
    Tracked                                        |
       ^                                           |
       |-------------------------------------------
                         수정사항
```

- 수정사항 화살표: `commit`되어 레포지토리에 들어간 후 수정사항이 발생하면 `untracked` 파일로서 스테이징을 기다리게 된다.

### Working directory

- 레포지토리의 파일들에 대해 수정사항이 생거나, 새로운 파일이 생기면 `Working directory`에 위치하게 된다.
  - `untracked`: Add된 적 없는 파일, ignore된 파일
  - `tracked`: Add된 적 있고 변경내역이 있는 파일
  - `git add` 명령어로 Staging area로 이동

### Staging area

- 커밋을 해서 레포지토리에 들어가기 전인 준비 단계
  - 예시: 작업을 위해 선택된 파일들
- `git commit` 명령어로 repository로 이동한다.

### Repository

- `.git directory`라고도 불린다.
- 커밋된 상태 즉, <b>이미 어떤 버전에 들어있는 상태</b>이다.
- GitHub에서 저장소를 하나 만들때 `Repository`라고 하는 이유는 이미 커밋이 된 상태의 파일들이 올라오기 때문이다.

### 그릇에 비유한 Git 개념

| 상태                 | 설명                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| untracked            | 식기세척기에 들어가 본 적이 없거나 식기세척기 사용이 불가(ignored)한 그릇 |
| tracked              | 식기세척기에 들어가 본 적이 있고 식기세척기 사용이 가능한 그릇            |
| add                  | 식기세척기에 넣는 행위                                                    |
| staging area         | 식기세척기 안(에 들어간 상태)                                             |
| commit               | 세척(식기세척기 가동)                                                     |
| repository           | 세척되어 깨끗해진 상태                                                    |
| 파일에 수정이 가해짐 | 그릇이 사용되어 이물질(커밋되지 않은 변경사항)이 묻음                     |
| working directory    | 세척되어야 하는 상태                                                      |

- `tracked`가 된다는 건, Git의 관리대상에 정식으로 등록됨을 의미한다.
- 새로 추가되는 파일은 반드시 `add`해줌으로써, 해당 파일이 `tracked`될 것임을 명시해야 하는 이유이다.
  - Git이 새 파일들을 무조건 다 관리해버리는 것을 방지하기 위해

## 파일의 삭제와 이동

### git rm

- `tiger.yaml`를 삭제해본 뒤 `git status`로 살펴보기
  - 파일의 삭제가 `working directory`에 있다.
  - `git reset --hard`로 복원
- `git rm tigers.yaml`로 삭제하고 `git status`로 살펴보기
  - 파일의 삭제가 `Staging area`에 있음 -> 바로 커밋을 위한 준비단계에 있음
  - `git reset --hard`로 복원

### git mv

- `tigers.yaml`를 `zzamtigers.yaml`로 이름변경 뒤 `git status`로 살펴보기
  - `untracked` 목록에 zzamtigers.yaml이 있고, `tracked` 목록에 `deleted: tigers.yaml`이 있다.
  - `git add .`해서 Staging area에 올려야 `renamed: tigers.yaml -> zzamtigers.yaml`로 표시가 뜬다.
- 복원 후 `git mv tigers.yaml zzamtigers.yaml`로 실행 뒤 비교
  - 바로 `Staging area`에 있음

### 파일을 `staging area`에서 `working directory`로

```bash
git restore --staged (파일명)
```

- `--staged`를 빼면 `working directory`에서도 제거
  - 즉, 수정한 변화 자체를 되돌리겠다는 의미 -> 해당 파일을 `Repository`에 두겠다는 말
  - 예전: `git reset HEAD (파일명)`

### `reset`의 세 가지 옵션

- --soft: `repository`에서 `staging area`로 이동
  - `Repository`에서만 제거하고 `Staging area`에 남겨둔다.
  - 즉, commit은 안됐지만 add가 된 상태로 둔다.
- --mixed(default): `repository`에서 `working directory`로 이동
  - `Working directory`에 남겨둔다.
  - 파일 자체는 변화시키지 않고, `Staging area`에서 제거한다.
- --hard: 수정사항 완전히 삭제
  - `Working directory`에서 한 작업들까지 모두 날려버리겠다는 의미

## HEAD

### Git의 HEAD

- <b>현재 속한 브랜치의 가장 최신 커밋</b>
  - 가지의 맨 끝단

### `checkout`으로 앞뒤 이동해보기

- 커밋 내역들은 그대로 두고 파일들의 상태만 뒤로 옮기는 즉, 시간선을 바꾸지 않고 그냥 과거로만 돌아가는 방법이 있다.

  - `checkout` 사용, `reset/revert`와는 다르다.

  ```bash
  git checkout HEAD^
  ```

- `^` 또는 `~`: 갯수만큼 이전으로 이동
  - `git checkout HEAD^^^`, `git checkout HEAD~5`
- `커밋 해시`를 사용해서도 이동 가능
  - `git checkout (커밋해시)`
- `git checkout -`: (이동을) 한 단계 되돌리기
  - `ctrl + z`같은 느낌

#### checkout과 HEAD

- HEAD가 각 브랜치의 가장 최신 커밋인데 `checkout`으로 과거로 돌아가면 해당 상태에 `HEAD` 표시가 되어있다.
  - <b>즉, 어떠한 브랜치도 아닌 익명의 다른 브랜치를 하나 만들어서 와있는 것!</b>
  - `git branch`로 확인하면 `(HEAD detached at 0000)`라는 익명 브랜치가 생성됨
  - `git switch`로 다른 브랜치의 HEAD로 이동하면 익명 브랜치는 사라짐
  - `git switch -c`로 익명 브랜치에 이름을 줘서 브랜치 생성과 동시에 그 브랜치로 이동할 수 있다.

### HEAD 사용하여 reset하기

```bash
git reset (reset옵션) HEAD(원하는 단계)
```

## fetch vs pull

### fetch와 pull의 차이

- `fetch`: 원격 저장소의 최신 커밋을 로컬로 가져오기만 함
- `pull`: 원격 저장소의 최신 커밋을 로컬로 가져와 `merge` 또는 `rebase`

### `fetch`한 내역 적용 전 살펴보기

- 원격의 `main` 브랜치에 커밋 추가
  - `git checkout origin/main`으로 확인해보기
- 원격의 변경사항 `fetch`
  - `git checkout origin/main`으로 확인해보기
  - `pull`로 적용

### 원격의 새 브랜치 확인

- `git checkout origin/(브랜치명)`
- `git switch -t origin/(브랜치명)`

# 06. Git 보다 잘 활용하기

## Help와 문서 활용하기

### git help

- Git 사용 중 모르는 부분이 있을 때 도움을 받을 수 있는 기능
  ```bash
  git help
  ```
- 기본적인 명령어들과 설명
  ```bash
  git help -a
  ```
  - Git의 모든 명령어들
  - `j`로 내리기, `k`로 올리기, `:q`로 닫기
- 해당 명령어의 설명과 옵션 보기
  ```bash
  git help (명령어)
  git (명령어) --help
  ```
  - 해당 명령어의 설명과 옵션 웹사이트에서 보기
  - 웹에서 열리지 않을 시 끝에 `-w`를 붙여 명시

### Git 문서

- [Git 문서 보기](https://git-scm.com/docs)
- [Pro Git 책 보기](https://git-scm.com/book/ko/v2)

## Git의 각종 설정

### global 설정과 local 설정

- config를 `--global`과 함께 지정하면 전역으로 설정된다.
  - 특정 프로젝트만의 `user.name`과 `user.email` 지정해보기

### 설정값 확인

```bash
git config (global) --list
git config (global) -e
git config --global core.editor "code --wait"
```

- `git config (global) --list`: 현재 모든 설정값 보기
- `git config (global) -e`: 에디터에서 보기 (기본: vi)
- `git config --global core.editor "code --wait"`: 기본 에디터 수정
  - 또는 `code` 자리에 원하는 편집 프로그램의 .exe파일 경로 연결
  - `--wait`: 에디터에서 수정하는 동안 CLI를 정지
  - `git commit` 등의 편집도 지정된 에디터에서 열게 된다.
- 위의 에디터 설정을 되돌리려면 `git config --global -e`로 편집기를 연 뒤 아래 부분을 삭제하고 저장

```
[core]
  excludesfile = /Users/yalco/.gitignore_global
  editor = code --wait
```

#### 맥에서 `code`로 VS Code가 실행되지 않을 시

- VS Code에서 `command` + `shift` + `p`
- `shell`로 검색하여 `셸 명령: PATH에 code 명령 설치` 선택
  - 영문: `Shell Command: Install 'code command in PATH`

### 유용한 설정들

```bash
git config --global core.autocrlf (윈도우: true/ 맥: input)
git config pull.rebase false
git config pull.rebase true
git config --global init.defaultBranch main
git config --global push.default current
```

- `git config --global core.autocrlf (윈도우: true/ 맥: input)`: 줄바꿈 호환 문제 해결
- `git config pull.rebase (false or true)`: `pull` 기본 전략 `merge` 또는 `rebase`로 설정
- `git config --global init.defaultBranch main`: 기본 브랜치명
- `git config --global push.default current`: push시 로컬과 동일한 브랜치명으로

### 단축키 설정

- [관련 문서 보기](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-Git-Alias)

```bash
git config --global alias.(단축키) "명령어"
```

- 예시: `git config --global alias.cam "commit -am"`

# 07. 프로답게 커밋 관리하기

## 어떻게 커밋하는게 좋을까요?

### 작업을 커밋할 때 권장사항

- <b>하나의 커밋에는 한 단위의 작업을 넣도록 한다.</b>
  - 한 작업을 여러 버전에 걸쳐 커밋하지 않는다.
  - 여러 작업을 한 버전에 커밋하지 않는다.
- 커밋 메시지는 어떤 작업이 이뤄졌는지 알아볼 수 있도록 작성한다.

### 커밋 메시지 컨벤션

- 널리 사용되는 커밋 메시지 작성방식

  ```
  type: subject

  body (optional)
  ...
  ...
  ...

  footer (optional)
  ```

#### 예시

```
feat: 압축파일 미리보기 기능 추가

사용자의 편의를 위해 압축을 풀기 전에
다음과 같이 압축파일 미리보기를 할 수 있도록 함
  - 마우스 오른쪽 클릭
  - 윈도우 탐색기 또는 맥 파인더의 미리보기 창
```

### Type

| 타입     | 설명                                            |
| -------- | ----------------------------------------------- |
| feat     | 새로운 기능 추가                                |
| fix      | 버그 수정                                       |
| docs     | 문서 수정                                       |
| style    | 공백, 세미콜론 등 스타일 수정                   |
| refactor | 코드 리팩토링                                   |
| perf     | 성능 개선                                       |
| test     | 테스트 추가                                     |
| chore    | 빌드 과정 또는 보조 기능(문서 생성기능 등) 수정 |

### Subject

- 커밋의 작업 내용 간략히 설명

### Body

- 길게 설명할 필요가 있을 시 작성

### Footer

- `Breaking Point`가 있을 때
- 특정 이슈에 대한 해결 작업일 때

### Gitmoji

- [사이트 방문하기](https://gitmoji.dev/)

## 보다 세심하게 스테이징하고 커밋하기

### 내용 확인하며 hunk별로 스테이징하기

#### Tigers 변경

- manager: `Thanos`
- coach: `Ronan`
- 새 members: `Gamora`, `Nebula`

#### Leopards 변경

- manager: `Peter`
- coach: `Rocket`
- 새 members: `Drax`, `Groot`

#### 아래 명령어로 hunk별 스테이징 진행

```bash
git add -p
```

- 옵션 설명을 보려면 `?` 입력 후 엔터
- `y` 또는 `n`로 각 헝크 선택
- 일부만 스테이징하고 진행해보기
- `git stats`와 소스트리로 확인

### 변경사항을 확인하고 커밋하기

```bash
git commit -v
```

- `j`, `k`로 스크롤하며 내용 확인
- `git diff --staged`와 비교
- 커밋 후 남은 헝크를 다른 버전으로 커밋해보기

## 커밋하기 애매한 변화 치워두기

### 변경사항 및 Stash 사용

#### 변경사항 만들기

- Tigers의 members에 `Stash` 추가
- `tomcats.yaml` 추가 후 `add`

  ```yaml
  team: Tomcats

  coach: Apache
  ```

#### 아래 명령어로 치워두기

```bash
git stash
```

- `git stash save`와 같다.

#### 원하는 시점, 브랜치에서 다시 적용

```bash
git stash pop
```

#### 원하는 것만 stash 해보기

- Leopards의 members에 `Stash2` 추가
- Jaguars의 members에 `Stash3` 추가
- 아래 명령어로 `Stash2`만 선택하여 스태시

```bash
git stash -p
```

#### 메시지와 함께 스태시

```bash
git stash -m 'Add Stash3'
```

#### 스태시 목록 보기

```bash
git stash list
```

- 리스트상의 번호로 `apply`, `drop`, `pop` 가능
  - ex) `git stash apply stash@{1}`

### Stash 사용법 정리

| 명령어                      | 설명                                          | 비고                           |
| --------------------------- | --------------------------------------------- | ------------------------------ |
| git stash                   | 현 작업을 치워두기                            | 끝에 save 생략                 |
| git stash apply             | 치워둔 마지막 항목(번호 없을 시) 적용         | 끝에 번호로 항목 지정 가능     |
| git stash drop              | 치원둔 마지막 항목(번호 없을 시) 삭제         | 끝에 번호로 항목 지정 가능     |
| git stash pop               | 치워둔 마지막 항목(번호 없을 시) 적용 및 삭제 | apply + drop                   |
| git stash branch (브랜치명) | 새 브랜치를 생성하여 pop                      | 충돌사항이 있는 상황 등에 유용 |
| git stash clear             | 치워둔 모든 항목들 비우기                     |                                |

## 커밋 수정하기

### git commit --amend

- 마지막 커밋 수정

#### 1. 커밋 메시지 변경

- Panthers의 members에 `Hoki` 추가하고 스테이지
- 커밋 메시지: `횻홍`
- 아래 명령어로 에디터 열어 커밋 메시지 변경

```bash
git commit --amend
```

- 커밋 메시지: `Add a member to Panthers`

#### 2. 커밋에 변화 추가

- Pumas의 members에 `Poki` 추가하고 스테이지
- `git commit --amend`로 마지막 커밋에 포함한다.
- 커밋 메시지 아무렇게나 변경

#### 3. 커밋 메시지 한 줄로 변경

```bash
git commit --amend -m 'Add members to Panthers and Pumas'
```

## 과거의 커밋들을 수정, 삭제 병합, 분할하기

### git rebase -i (대상 바로 이전 커밋)

- 과거 커밋 내역을 다양한 방법으로 수정 가능

  | 명령어    | 설명               |
  | --------- | ------------------ |
  | p, pick   | 커밋 그대로 두기   |
  | r, reward | 커밋 메시지 변경   |
  | e, edit   | 수정을 위해 정지   |
  | d, drop   | 커밋 삭제          |
  | s, squash | 이전 커밋에 합치기 |

### 다음의 수정사항들 진행해보기

- `횻홍`을 `버그 수정`으로 변경
  - `r` 명령어 사용
- `뻘짓` 커밋 삭제
  - `d` 명령어 사용
- 결전의 찜질망 항목들 합치기
  - 첫 항목 뒤로 `s` 명령어 사용
  - 메시지 수정 후 저장
- `캐릭터 귤맨 추가`, `시작메뉴 디자인 변경` 항목 나누기
  - `e` 명령어로 수정 시작
  - `git reset HEAD~`
  - 변화들을 따로 스테이지 및 커밋
  - `git rebase --continue`
