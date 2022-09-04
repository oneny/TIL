# Git

## 목차

- [Fast forward vs 3-way merge](#fast-forward-vs-3-way-merge)
- [과거로 돌아가는 두 가지 방법(reset, revert)](#과거로-돌아가는-두-가지-방법reset-revert)
- [Branch](#branch)
- [서로 다른 branch를 합치는 두 가지 방법(merge, rebase)](#서로-다른-branch를-합치는-두-가지-방법merge-rebase)
- [원격 저장 저장소 사용하기](#원격-저장-저장소-사용하기)
- [협업 시 충돌 발생 해결(pull할 것이 있을 때 push를 하면)](#협업-시-충돌-발생-해결pull할-것이-있을-때-push를-하면)
- [원격의 브랜치](#원격의-브랜치)
- [Git의 3가지 공간](#git의-3가지-공강)
- [Git 공간 이동](#git-공간-이동)
- [HEAD과 checkout](#head과-checkout)
- [Help](#help)
- [Git의 각종 설정(config)](#git의-각종-설정config)
- [커밋하기 애매한 변화 치워두기(stash)](#커밋하기-애매한-변화-치워두기stash)
- [커밋 수정하기(commit)](#커밋-수정하기commit)
- [과거의 커밋들을 수정, 삭제, 병합 분할하기(rebase -i)](#과거의-커밋들을-수정-삭제-병합-분할하기rebase--i)
- [Git에서 추적하지 않는 파일들 삭제(clean)](#git에서-추적하지-않는-파일들-삭제clean)
- [커밋하지 않은 변경사항 되돌리기(restore)](#커밋하지-않은-변경사항-되돌리기restore)
- [태그](#태그)
- [다른 브랜치에서 원하는 커밋만 따오기(cherry-pick, rebase --onto, merge --squash)](#다른-브랜치에서-원하는-커밋만-따오기cherry-pick-rebase---onto-merge---squash)
- [협업을 위한 브랜치 활용법(Gitflow)](#협업을-위한-브랜치-활용법gitflow)
- [log](#log)
- [차이 살펴보기(diff)](#차이-살펴보기diff)
- [누가 코딩했는지 알아내기(blame)](#누가-코딩했는지-알아내기blame)
- [오류가 발생한 시점 찾아내기(bisect)](#오류가-발생한-시점-찾아내기bisect)
- [GitHub CLI](#github-cli)
### Fast forward vs 3-way merge

#### Fast forward

```
         - o - o "B"
       /
- o - o "A"
```

- `A` 브랜치에서 이후 작업이 없는 경우 `B` 브랜치와 병합 시 그 둘을 병합하기 위한 다른 커밋을 만들지 않고, `A` 브랜치의 헤드를 `B` 브랜치까지 옮기는 방식이다.
  - 새로운 커밋으로 병합해서 만들어봤자 `B` 최신 커밋 상태 그대로일 테니깐!
  - 즉, `A` 브랜치의 헤드를 `Fast forward` -> 빨리감기 해버리는 것이 더 효율적!
    - 그리고 병합된 브랜치는 없애면 된다.

#### 3-way merge

```
      "B"
     - o --
   /        \  (merge)
- o - o - o - o
         "A"
```

- 두 브랜치를 병할할 때, 두 커밋 모두에 속한 어떤 파일들이 양쪽에서 내용이 다른 경우
  - Git은 그 파일들 각각 `B 브랜치에서 변경된 것인지`, `A 브랜치에서 변경된 것인지`, `양쪽 모두에서 변경돼서 충돌이 일어나고 있는 상황인지`를 판단해야 한다.
  - 기준이 두 브랜치의 공통 조상이 되는 커밋의 내용으로 공통 조상으로부터 두 커밋을 대조하기 때문에 `3-way`(공통 조상, A, B)라고 하는 것이다.

### 과거로 돌아가는 두 가지 방법(reset, revert)

```bash
# reset: 원하는 시점으로 돌아간 뒤 이후 내역(히스토리)들을 지운다.
# --soft: repository에서 staging area로 이동 -> commit은 안됐지만 add가 된 상태로
# --mixed(기본값): repository에서 working directory로 이동 -> 파일 자체는 변화시키지 않고 staging area 목록에서 제거
# --hard: working directory에서 한 작업들까지 모두 날려버리겠다는 의미
git reset (reset 옵션) (돌아갈 커밋 해시)
git reset (reset옵션) (HEAD 원하는 단계)
git reset --hard # 뒤에 커밋 해시가 없으면 마지막 커밋을 가리킨다.

# revert: 되돌리기 원하는 시점의 커밋을 거꾸로 실행한다.
git revert (되돌릴 커밋 해시)

# 커밋하지 않고 revert, 원하는 다른 작업을 추가한 다음 함께 커밋하고 싶을 때 사용
git revert --no--commit (되돌릴 커밋 해시)

# reset 했어도 지워진 커밋 내역으로 되돌아가는 방법
# 프로젝트가 위치한 커밋이 바뀔 때마다 기록되는 내역을 보여주고 내역의 해시를 이용하여 reset하기 이전 시점으로 프로젝트를 복구할 수 있다.
git reflog
```

### Branch

```bash
# `add-coach`란 이름의 브랜치 생성
git branch add-coach

# git branch 목록 확인
git branch

# `add-coach` 브랜치 이동
git switch add-coach

# 브랜치 생성과 동시에 이동하기
git switch -c (브랜치 이름)

# 브랜치 삭제
git brach -d (삭제할 브랜치명)

# 브랜치 강제 삭제
# `merge`나 `rebase`가 되지 않은 브랜치 중 필요한 브랜치였는데 실수로 삭제하는 것을 방지하기 위해 기본적으로 막는다.
git branch -D (강제삭제할 브랜치명)

# 브랜치 이름 바꾸기
git branch -m (기존 브랜치명) (새 브랜치명)
```

### 서로 다른 branch를 합치는 두 가지 방법(merge, rebase)

```bash
# merge: 두 브랜치를 한 커밋에 이어붙인다.
# 주 브랜치에서 서브 브랜치 병합(주 브랜치에서 실행)
git merge (서브 브랜치)

# 충돌 해결이 당장 어려울 경우 `merge` 중단
git merge --abort

# rebase: 브랜치를 다른 브랜치에 이어붙인다.
# 서브 브랜치의 가지를 메인 브랜치에 병합(서브 브랜치에서 실행)
git rebase (메인 브랜치)

# 메인 브랜치를 최신 커밋 상태로 올리기(fast-forward)(메인 브랜치에서 실행)
git merge (서브 브랜치)

# 충돌 해결이 당장 어려울 경우 `rebase` 중단
git rebase --abort

# 충돌 부분을 수정한 뒤 git add . 후
git rebase --continue
```

### 원격 저장 저장소 사용하기

```bash
# Git의 remote 즉, 원격 저장소 중 하나인 origin에 해당 주소를 추가(add)
git remote add origin (원격 저장소 주소)

# Git 기본 브랜치명을 main으로
git branch -M main

# Git에서 로컬(내 컴퓨터)에 있는 커밋 내역들 중 아직 원격 저장소에 없는 것들을 업로드
# -u origin main: 어느 원격의 어느 브랜체아다가 push할 지를 `-u` 뒤에 설정
git push -u (원격 저장소명) (브랜치명)
git push -u origin main

# 원격 저장소 목록 확인, -v 붙이면 자세히 보기
git remote (-v)

# 원격의 커밋 당겨오기
git pull
```

### 협업 시 충돌 발생 해결(pull할 것이 있을 때 push를 하면)

```bash
# merge 방식: 로컬과 원격 저장소를 어긋난 시간선으로 다르게 보고 두 갈래로 나뉜 후 모인다.
# 충돌 발생 시: 충돌하는 둘 중 하나를 선택하여 두 가지에서 하나로 모인다.
git pull --no-rebase

# rebase 방식: 로컬의 main 브랜치 뒤에 원격 저장소의 main 브래치가 뒤로 와서 한줄
# 충돌 발생 시1: 원격 저장소(origin)의 main 브랜치 것을 선택하면 커밋을 하나(로컬의 것을 필요가 없어지므로)
# 충돌 발생 시2: 로컬의 것을 선택하면 커밋이 두 개 생긴다.
git pull --rebase

# 로컬의 내역 강제 push(로컬의 내역 충돌 전으로 reset)
git push --force
```

### 원격의 브랜치

```bash
# 원격 저장소에 로컬 브랜치 올리기
git push -u origin (브랜치명)

# 로컬과 원격의 브랜치 목록 확인
git branch --all(or -a)

# '원격의 브랜치 로컬에 받아오기'
# fetch를 통해 원격의 변경사항 가져오기
git fetch

# 로컬에 같은 이름의 브랜치를 생성하고 연결
git switch -t origin/(브랜치명)

# 원격의 브랜치 삭제
git push (원격 이름) --delete (원격의 브랜치명)

# 원격의 브랜치로 이동해서 상태만 보고오기
git checkout (원격명)/(브랜치명)
```

### Git의 3가지 공강

```
'Working directory': 레포지토리의 파일들에 대해 수정사항이 생기거나, 새로운 파일 생기면 해당 공간에 위치
  - 'untracked': Add된 적 없는 파일, ignore된 파일
  - 'tracked': Add된 적 있고, 변경내역이 있는 파일
  - git add 명령어로 Staging area로 이동

'Staging area': 커밋을 해서 레포지토리에 들어가기 전인 준비 단계
  - git commit 명령어로 'Repository'로 이동한다.

Repository: 커밋된 상태 즉, 이미 어떤 버전에 들어있는 상태
  - '.git directory'라고도 불린다.
  - GitHub에서 저장소를 하나 만들때 'Repository'라고 하는 이유가 이미 커밋된 상태의 파일들이 올라오기 때문
```

### Git 공간 이동

```bash
# 파일 삭제 + 바로 Staging area로 올리기 -> 파일 삭제 + git add .
git rm (파일명)

# 파일 이름 변경 + 바로 Staging area로 올리기 -> 파일 renamed + git add .
git mv (파일명)

# 파일을 staging area -> working directory
# --staged 빼면 working directory에서도 제거 -> 수정한 작업마저 되돌리겠다는 의미
git restore --staged (파일명)
```

### HEAD과 checkout

- Git의 `HEAD`: 현재 속한 브랜치의 가장 최신 커밋(가지의 맨 끝단)
- `checkout`: 커밋 내역들은 그대로 두고 파일들의 상태만 뒤로 옮기는 즉, 시간선을 바꾸지 않고 그냥 과거로만 돌아갈 때 사용
- HEAD가 각 브랜치의 가장 최신 커밋인데 `checkout`으로 과거로 돌아가면 해당 상태에 `HEAD`가 표시된다.
  - **즉, 어떠한 브랜치도 아닌 익명의 다른 브랜치를 하나 만들어서 와있는 것!**
  - `git branch`로 확인하면 (HEAD detached at 0000)라는 익명의 브랜치가 생성된다.
  - `git switch`로 다른 브랜치의 HEAD로 이동하면 익명 브랜치는 사라진다.
  - `git switch -c`로 익명 브랜치에 이름을 줘서 브랜치 생성하고 그 브랜치로 이동할 수 있다.

```bash
# checkout
git checkout HEAD^ #^ 또는 ~ 개수만큼 이전으로 이동(ex. HEAD^^^, HEAD~5)

# 커밋 해시를 사용해서 이동
git checkout (커밋 해시)

# 원격 저장소의 브랜치로 이동할 때도 checkout을 사용
git checkout origin/main(원격 저장소명/브랜치명)

# 한 단계 되돌리기
git checkout -
```

### Help

```bash
# 기본적인 명령어들과 설명을 보여주며 사용 중 모르는 부분을 도움받을 수 있다.
git help

# Git의 모든 명령어들
git help -a

# 해당 명령어의 설명과 옵션 보기
git (명령어) -h

# 해당 명령어의 설명과 옵션 웹사이트에서 보기
# 웹에서 열리지 않을 시 끝에 '-w'를 붙여 명시
git help (명령어)
git (명령어) --help
```

### Git의 각종 설정(config)

- global 설정과 local 설정
  - config를 `--global`과 함께 작성하면 전역으로 설정된다.

```bash
# 설정값 확인
# 현재 모든 설정값 보기
git config (--global) --list

# 에디터에서 보기 (기본: vi)
# config 설정값을 되돌리거나 할 때 에디터에서 쉽게 수정하고 저장할 수 있다.
git config (--global) -e

# 기본 에디터 수정
git config --global core.editor "code --wait"
# 맥의 경우(해당 에디터 위치로 설정해서 열 수 있도록 해야한다.)
git config --global core.editor "/Applications/Visual\ Studio\ Code.app/Contents/MacOS/Electron"

# 줄바꿈 호환 문제 해결
# 윈도우, 맥 경우 줄바꿈에서 엔터를 칠 때 컴퓨터가 인식하는 방식이 다르기 때문에 설정
git config --global core.autocrlf (윈도우: true/ 맥: intput)

# pull의 기본전략 설정
git config pull.rebase false # 기본 pull 방식을 merge으로
git config pull.rebase true # 기본 pull 방식을 rebase으로

# 기본 브랜치명 설정
git config --global init.defaultBranch main

# push시 로컬과 동일한 브랜치명으로
git config --global push.default current

# 단축키 설정
git config --global alias.(단축키) "명령어"
git config --global alias.cam "commit -am" # git cam "메시지"로 해당 명령어 실행 가능
```

### 커밋하기 애매한 변화 치워두기(stash)

- 커밋은 한 작업 단위로 하는데 급하게 오류 수정하거나 다른 것을 처리해야할 때 `stash`사용

```bash
# 해당 작업한 내역을 치워두기
git stash # 끝에 save 생략

# 치워둔 마지막 항목(번호 없을 시) 적용 - 끝에 번호로 항목 지정 가능
git stash apply

# 치워둔 마지막 항목(번호 없을 시) 삭제 - 끝에 번호로 항목 지정 가능
git stash drop

# 치워둔 마지막 항목(번호 없을 시) 적용 및 삭제 - apply + drop
git stash pop

# 원하는 것만 hunk별로 stash 하기
git stash -p

# 메시지와 함께 stash
git stash -m "메시지"

# stash 목록 보기
git stash list

# 새 브랜치를 생성하여 pop - 충돌사항이 있는 상황 등에 유용
git stash branch (브랜치명)

# 치워둔 모든 항목들 비우기
git stash clear
```

### 커밋 수정하기(commit)

```bash
# 커밋 시 수정내용도 확인 가능
git commit -v

# 마지막 커밋 수정
git commit --amend

# 커밋 메시지 한 줄로 변경
# 추가 수정 작업하고 git add .로 스테이지에 올린 후
# git commit --amend -m "메시지"하면 이전 메시지부터 수정내역까지 덮어쓰기할 수 있다.
git commit --amend -m "메시지"
```

### 과거의 커밋들을 수정, 삭제, 병합 분할하기(rebase -i)

#### `git rebase -i`

- 과거 커밋 내역을 다양한 방법으로 수정 가능

  | 명령어    | 설명               |
  | --------- | ------------------ |
  | p, pick   | 커밋 그대로 두기   |
  | r, reward | 커밋 메시지 변경   |
  | e, edit   | 수정을 위해 정지   |
  | d, drop   | 커밋 삭제          |
  | s, squash | 이전 커밋에 합치기 |

### Git에서 추적하지 않는 파일들 삭제(clean)

#### `git clean`

- Git에서 추적하지 않는 파일들 삭제

  - 흔히 쓰이는 조합: `git clean -df`

  | 옵션 | 설명                                |
  | ---- | ----------------------------------- |
  | -n   | 삭제될 파일들 보여주기              |
  | -i   | 인터렉티브 모드 시작                |
  | -d   | 폴더 포함                           |
  | -f   | 강제로 바로 지워버리기              |
  | -x   | `.gitignore`에 등록된 파일들도 삭제 |

### 커밋하지 않은 변경사항 되돌리기(restore)

```bash
# 특정 파일을 지정한 상태로 복구
git restore (파일명) # .을 사용하면 모든 파일 복구

# 변경상태를 staging area에서 working directory로 돌려놓기
git restore --staged (파일명)

# 파일을 특정 커밋의 상태로 되돌리기
git restore --source=(헤드 또는 커밋 해시) 파일명
```

### 태그

```bash
# 특정 시점을 키워드로 저장하고 싶을 때 태그 달기(lightweight)
git tag v2.0.0

# 현존하는 태그 확인
git tag

# 원하는 태그의 내용 확인
git show v2.0.0

# 태그 삭제
git tag -d v2.0.0

# 마지막 커밋에 태그 달기(annotated)
git tag -a v2.0.0

# 메시지 입력과 함께 태그 달기
git tag -m "메시지"

# 원하는 커밋에 태그 달기
git tag (태그명) (커밋 해시) -m "메시지"

# 원하는 패턴으로 필터링해서 태그 확인
git tag -l "v1.*"
git tag -l "*0"

# 원하는 버전으로 체크아웃
git checkout v1.2.1

# 특정 태그 원격에 올리기
git push (원격명) (태그명)

# 특정 태그 원격에서 삭제
git push --delete (원격명) (태그명)

# 로컬의 모든 태그를 원경에 올리기
git push --tags
```

### 다른 브랜치에서 원하는 커밋만 따오기(cherry-pick, rebase --onto, merge --squash)

```bash
# 특정 커밋만 복제해서 가져오는 것이라 생각하면 된다.
git cherry-pick (커밋 해시)

# 다른 가지의 잔가지만 가져오기(rebase)
git rebase --onto (도착 브랜치) (출발 브랜치) (이동할 브랜치)

# 다른 가지의 마디들을 하나로 묶어서 가져오기
# merge --squash는 merge되거나 rebase된 흔적이 남아있지 않는다.
git merge --squash (대상 브랜치) # 이후 변경사항들이 staged되어 있다.
```

### 협업을 위한 브랜치 활용법(Gitflow)

#### main

- 제품 출시/배포
- 실제로 사용자들에게 출시될 버전들이 최종적으로 `merge`된다.

#### develop

- 다음 출시/배포를 위한 개발 진행
- `main`의 버전들을 만들어 내기 위한 개발 작업을 해당 브랜치에서 한다.
  - 즉, 새로운 기능을 추가, 수정 등 작업

#### feature

- `develop` 브랜치에서 굵직한 기능은 따로 브랜치를 만들어서 진행하는데 그 때 사용하는 브랜치
  - 따라서 `feature--(무슨기능)처럼 브랜치는 여러 개가 될 수 있다.
  - 기능이 완성되면 `develop` 브랜치로 다시 보내서 개발을 해내간다.

#### release

- 개발을 어느 정도 완성해서 출시를 해도 될 것 같으면 해당 브랜치로 옮겨 QA팀 등 테스트를 하는 사람들에 의해서 검증이 이루어지는 곳이다.
- 성능, 버그 통과되면 `main` 브랜치로 이동한다.

#### hotfix

- 기존 출시된 버전에서 오류가 발견이 되면 해당 브랜치를 사용한다.


### log
```bash
# 위치한 브랜치에서의 커밋 내역 확인
git log

# 여러 브랜치의 내역 보기
git log --all --decorate --oneline --graph

# 각 커밋마다의 변경사항 함께 보기
git log -p

# 최근 n개 커밋만 보기
git log -(개수)

# 통계와 함께 보기
git log --stat

# 한 줄로 보기(--pretty=oneline --abbrev-commit의 줄임)
git log --oneline

# 변경사항 내 단어 검색
git log -S (검색어)

# 커밋 메시지로 검색
git log --grep (검색어)

# 자주 사용되는 그래프 로그 보기
# --all: 모든 브랜치 보기
# --graph: 그래프 표현
# --decorate: 브랜치, 태그 등 모든 레퍼런스 표시
git log --all --decorate --oneline --graph

# 포맷된 로그 예시
git log --graph --all --pretty=format:'%C(yellow) %h  %C(reset)%C(blue)%ad%C(reset) : %C(white)%s %C(bold green)-- %an%C(reset) %C(bold red)%d%C(reset)' --date=short
```

### 차이 살펴보기(diff)
```bash
# 워킹 디렉토리의 변경사항 확인
git diff

# 파일명만 확인
git diff --name-only

# 스테이지의 확인(--cached와 같음)
git diff --staged

# 커밋 간의 차이 확인
git diff (커밋1) (커밋2)
git diff --name-only HEAD~3 HEAD~7 #처럼 활용 가능

# 브랜치 간의 차이 확인
git diff (브랜치1) (브랜치2)
```

### 누가 코딩했는지 알아내기(blame)

```bash
# 파일의 부분별로 작성자 확인하기
git blame (파일명)

# 특정 부분 지정해서 작성자 확인하기
git blame -L (시작줄) (끝줄, 또는 +줄수) (파일명)
```

### 오류가 발생한 시점 찾아내기(bisect)
* 이진 탐색 알고리즘으로 문제 발생 시점 찾아내기

```bash
# 이진 탐색 시작
git bisect start

# 오류발생 지점임을 표시
git bisect bad

# 의심 지점으로 이동
git checkout (해당 커밋 해시)

# 오류 발생 않을 시 양호함 표시
git bisect good

# 원인을 찾을 때까지 반복 후
# 이진 탐색 종료
git bisect reset
```

### Git Submodules

```bash
# main-project에 서브모듈로 submodule 프로젝트 추가
git submodule add (submodule의 GitHub 레포 주소) (하위폴더명, 없을 시 생략)

# 서브모듈 업데이트
git submodule init (특정 서브모듈 지정시 해당 이름)
git submodule update

# GitHub에서 submodule에 수정사항 커밋 후 받아오기(main-project에서 실행)
# 서브모듈 안에 또 서브모듈이 있을시 --recursive 추가
git submodule update --remote
```

### GitHub CLI

```bash
# 로그인/로그아웃
gh auth (login/logout)

# 레포지토리들 보기
gh repo list

# 프로젝트 클론
gh repo clone (사용자명)/(레포지토리명)

# 프로젝트 생성/삭제
gh repo (create/delete)

# 이슈 목록 보기
gh issue list

# 이슈 열람/닫기
git issue (view/cloe) (이슈 번호)

# 이슈 생성
gh issue create

# 풀 리퀘스트 만들기/목록 보기
gh pr (create/list)

# 풀 리퀘스트 보기/코멘트/닫기/병합
gh pr (view/comment/close/merge) (PR 번호)
```