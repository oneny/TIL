# Git

> 출처: [제대로 파는 Git & GitHub - by 얄코](https://www.inflearn.com/course/%EC%A0%9C%EB%8C%80%EB%A1%9C-%ED%8C%8C%EB%8A%94-%EA%B9%83/dashboard)

## 목차

- [08. 취소와 되돌리기 보다 깊이 알기](#08-취소와-되돌리기-보다-깊이-알기)
  - [관리되지 않는 파일들 삭제하기](#관리되지-않는-파일들-삭제하기)
    - [git clean](#git-clean)
    - [파일들 추가한 뒤 옵션 조합과 함께 clean 명령어 사용해보기](#파일들-추가한-뒤-옵션-조합과-함께-clean-명령어-사용해보기)
  - [커밋하지 않은 변경사항 되돌리기](#커밋하지-않은-변경사항-되돌리기)
    - [git restore](#git-restore)
  - [reset했어도 희망은 있다!](#reset했어도-희망은-있다)
    - [reflog 명령어](#reflog-명령어)
- [09. 태그](#09-태그)
  - [커밋에 태그 달기](#커밋에-태그-달기)
    - [Git의 Tag](#git의-tag)
    - [태그 달아보기](#태그-달아보기)
  - [원격의 태그와 릴리즈](#원격의-태그와-릴리즈)
    - [원격에 태그 동기화](#원격에-태그-동기화)
  - [GitHub의 release](#github의-release)

# 08. 취소와 되돌리기 보다 깊이 알기

## 관리되지 않는 파일들 삭제하기

### git clean

- Git에서 추적하지 않는 파일들 삭제
  |옵션|설명|
  |--|--|
  |-n|삭제될 파일들 보여주기|
  |-i|인터렉티브 모드 시작|
  |-d|폴더 포함|
  |-f|강제로 바로 지워버리기|
  |-x| `.gitignore`에 등록된 파일들도 삭제|

* 위의 옵션들을 조합하여 사용한다.

#### 파일들 추가한 뒤 옵션 조합과 함께 clean 명령어 사용해보기

- toClean1.txt
- toClean2.txt
- dir/toClean3.txt

💡 <b>흔히 쓰이는 조합: `git clean -df`</b>

## 커밋하지 않은 변경사항 되돌리기

### git restore

- 특정 파일을 지정된 상태로 복구

#### 파일 여러 개를 수정하고 아래 명령어들 사용해보기

```bash
git restore (파일명)
```

- 워킹 디렉토리의 특정 파일 복구
- 파일명 자리에 `.`: 모든 파일 복구

#### 변경상태를 스테이지에서 워킹 디렉토리로 돌려놓기

```bash
git resotre --staged (파일명)
```

#### 파일을 특정 커밋의 상태로 되돌리기

```bash
git restore --sourc=(헤드 또는 커밋 해시) 파일명
```

## reset했어도 희망은 있다!

### reflog 명령어

```bash
git reflog
```

- `reflog`는 프로젝트가 위치한 커밋이 바뀔 때마다 기록되는 내역을 보여주고 이를 사용하여 `reset`하기 이전 시점으로 프로젝트를 복구할 수 있다.

# 09. 태그

## 커밋에 태그 달기

### Git의 Tag

- 특정 시점을 키워드로 저장하고 싶을 때
- 커밋에 버전 정보를 붙이고자 할 때
  - [VS Code 레포지토리 예시](https://github.com/microsoft/vscode)

💡 [Semantic Versioning 정보](https://semver.org/lang/ko/)

### 태그 달아보기

|태그 종류|설명|
|lightweight|특정 커밋을 가리키는 용도|
|annotated|작성자 정보와 날짜, 메시지, GPG 서명 포함 가능|

#### 마지막 커밋 태그 달기(lightweight)

```bash
git tag v2.0.0
```

#### 현존하는 태그 확인

```bash
git tag
```

#### 원하는 태그의 내용 확인

```bash
git show v2.0.0
```

#### 태그 삭제

```bash
git tag -d v2.0.02
```

#### 마지막 커밋에 태그 달기 (annotated)

```bash
git tag -a v2.0.0
```

입력 후 메시지 작성 또는

```bash
git tag v2.0.0 -m '자진모리 버전'
```

- `-m` 태그가 `-a` 태그 암시
- `git show v2.0.0`으로 확인

#### 원하는 커밋에 태그 달기

```bash
git tag (태그명) (커밋 해시) -m (메시지)
```

- 원하는 커밋에 아래 태그들 추가
  - `v1.0.0` (굿거리 버전)
  - `v1.2.1` (휘모리 버전)

#### 원하는 패턴으로 필터링하기

```bash
git tag -l 'v1.*'
```

#### 원하는 버전으로 체크아웃

```bash
git checkout v1.2.1
```

- `switch`로 이전 브래치로 복귀

## 원격의 태그와 릴리즈

### 원격에 태그 동기화

#### 특정 태그 원격에 올리기

```bash
git push (원격명) (태그명)
```

- GitHub에서 확인

#### 특정 태그 원격에서 삭제

```bash
git push --delete (원격명) (태그명)
```

#### 로컬 태그 원격에서 삭제

```bash
git push --delete (원격명) (태그명)
```

#### 로컬의 모든 태그 원격에 올리기

```bash
git push --tags
```

### GitHub의 release

- 다운로드 가능한 배포판 기능
- [네이버 나눔고딕 코딩글꼴 예시](https://github.com/naver/nanumfont)

#### 릴리즈 만들어보기

- GitHub에서 태그 목록으로
- 원하는 태그에서 `Create release`
- 제목과 내용(마크다운) 입력 후 `Publish release`

### Fastforward vs 3-way merge

> Git에서 `merge`가 이뤄지는 두 방식 <b>Fastforward</b>와 <b>3-way-merge</b>를 비교한다.

# 10. Branch 보다 깊이 알기

## 다른 브랜치에서 원하는 커밋만 따오기

### 다른 브랜치의 원하는 커밋 가져오기

```
            Lemon  Lime
              o --- o  "citrus"
            /
       Orange Cherry Grape
          o --- o --- o  "fruit"
        /
- o --- o --- o --- o   "main"
 F.C. Apple Carrot Onion
               \
                o --- o --- o  "root"
             Potato Radish Beet
```

- `cherry-pick` 명령어 사용

#### `Cherry` 커밋 `main` 브랜치로 가져오기

- `main` 브랜치에서 실행

```bash
git cherry-pick (체리의 해시)
```

- `fruit` 브랜치의 `Cherry`와는 <b>별개의 커밋</b>

### 다른 가지의 잔가지만 가져오기

#### 다른 브랜치에서 파생된 브랜치 옮겨붙이기

- `rebase --onto` 옵션

#### `fruit` 브랜치에서 파생된 `citrus` 브랜치를 `main` 브랜치로 옮겨붙이기

```bash
git rebase --onto (도착 브랜치) (출발 브랜치) (이동할 브랜치)
```

- `git rebase --onto main fruit citrus`
- `citrus`로 fast forward

### `rebase --onto`를 되돌리려면?

- 위의 사항들을 진행한 뒤 `git reflog`를 사용해서 내역을 살펴보면 `rebase --onto` 명령 시 여러 내역들이 진행된 것을 확인할 수 있다.
  - `rebase --onto`가 여러 동작들을 포함한다는 것을 알 수 있다.
  - 그럼 전체 브랜치의 상태를 `rebase --onto` 이전으로 돌리려면 어떻게 하면 될까?
    - `reset`은 브랜치별로 이뤄지므로, `rebase --onto`로 영향을 받은 모든 브랜치들에서 하나하나 리셋을 진행해주어야 한다.
    - 혹은 다시 옮겨붙이는 방법도 있다.
    - 지금하는 실습으로 변화가 일어나는 브랜치는 `main`(패스트포워드 됨)과 `citrus`이 둘이다.

#### main 브랜치

- `main`은 그리로 옮겨붙여진 `citrus`로 fastforward된 것이 마지막 액션이므로 `reflog`의 기록상에서 그 이전 기록으로 `reset --hard`를 하면 된다.
  - lemon과 lime이 추가되기 전으로 돌아가는 것이다.

#### citrus 브랜치

- <b>방법 A</b>
  - 그리고 `citrus` 브랜치는 해당 브랜치가 옮겨지기 전 마지막 커밋인 `commit: Lime` 부분을 `reflog`에서 찾아 그리로 `reset --hard`하면 된다.
- <b>방법 B</b>
  - 다시 `rebase --onto`를 사용해서 `citrus`의 커밋들을 `main`으로부터 도로 `fruit` 브랜치의 `orange` 부분으로 옮기는 것이다.
  - 그러러면 `orange` 커밋으로 `checkout`한 다음 그곳에서 새 브랜치 만들고 (`temp`라 가정)
  ```
  git rebase --onto temp main citrus
  ```
  - 위 명령어로 `citrus`의 두 커밋들을 해당 위치로 옮겨붙인 뒤 `temp` 브랜치는 삭제하면 된다.

### 다른 가지의 마디들 묶어서 가져오기

#### 다른 커밋들을 하나로 묶어 가져오기

`merge --squash` 옵션 사용

#### `root` 브랜치의 마디들을 하나로 묶어 `main` 브랜치로 가져오기

```bash
git merge --squash (대상 브랜치)
```

- 변경사항들 스테이지 되어 있음
- `git commit` 후 메시지 입력

#### 일반 merge와의 차이 정리

- 일반 `merge`와 `merge --squash`는, 실행 후 코드의 상태는 같지만 내역 면에서 큰 차이가 있는 것이라고 이해하면 된다.
  - 일반 `merge`: A와 B 두 브랜치를 한 곳으로 이어붙임
  - `merge --squash`: B 브랜치의 마디들을 복사해다가 한 마디로 모아 A 브랜치에 붙임 (staged 상태로)

## 협업을 위한 브랜치 활용법

### Gitflow

- 협업을 위한 브랜칭 전략
- ['Vincent Driessen at nvie'의 페이지](https://nvie.com/posts/a-successful-git-branching-model/)
  - 위 페이지의 도표 참조

#### 사용되는 브랜치들

| 브랜치  | 용도                            |
| ------- | ------------------------------- |
| main    | 제품 출시/배포                  |
| develop | 다음 출시/배포를 위한 개발 진행 |
| release | 출시/배포 전 테스트 진행(QA)    |
| feature | 기능 개발                       |
| hotfix  | 긴급한 버그 수정                |

# 11. 분석하고 디버깅하기

## log 더 자세히 알아보기

### 옵션들을 활용한 다양한 사용법

- <b>각 커밋마다의 변경사항 함께 보기</b>
  ```bash
  git log -p
  ```
- <b>최근 n개 커밋만 보기</b>
  ```bash
  git log -(갯수)
  ```
- <b>통계와 함께 보기</b>
  ```bash
  git log --stat
  ```
  - 더 간랸히: `--shortstat`
- <b>한 줄로 보기</b>
  ```bash
  git log --oneline
  ```
  - `--pretty=oneline --abbrev-commit`의 줄임
- <b>변경사항 내 단어 검색</b>
  ```bash
  git log -S (검색어)
  ```
  - `George`로 검색
- <b>커밋 메시지로 검색</b>
  ```bash
  git log --grep (검색어)
  ```
  - [기타 제한 옵션 보기](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EC%BB%A4%EB%B0%8B-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#limit_options)
- <b>자주 사용되는 그래프 로그 보기</b>
  ```bash
  git log --all --decorate --oneline --graph
  ```
  - `--all`: 모든 브랜치 보기
  - `--graph`: 그래프 표현
  - `--decorate`: 브랜치, 태그 등 모든 레퍼런스 표시
    - `--decorate=no`
    - `--decorate=short`: 기본
    - `--decorate=full`

### 포맷된 로그 보기

> [포매팅 옵션들 살펴보기](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EC%BB%A4%EB%B0%8B-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#pretty_format)

#### 얄코 포맷

```bash
git log --graph --all --pretty=format:'%C(yellow) %h  %C(reset)%C(blue)%ad%C(reset) : %C(white)%s %C(bold green)-- %an%C(reset) %C(bold red)%d%C(reset)' --date=short
```

- `date`를 `relative`로 바꿔보기
- 단축키로 등록하여 사용

## 차이 살펴보기

### git diff

- <b>워킹 디렉토리의 변경사항 확인</b>
  ```bash
  git diff
  ```
- <b>파일명만 확인</b>
  ```bash
  git diff --name-only
  ```
- <b>스테이지의 확인</b>
  ```bash
  gir diff --staged
  ```
  - `--cached`와 같음
- <b>커밋간의 차이 확인</b>
  ```bash
  git diff (커밋1) (커밋2)
  ```
  - 커밋 해시 또는 HEAD 번호로
  - 현재 커밋과 비교하려면 이전 커밋만 명시
- <b>브랜치간의 차이 확인</b>
  ```bash
  git diff (브랜치1) (브랜치2)
  ```

## 누가 코딩했는지 알아내기

### git blame

- 각 라인의 작성자를 확인한다.
- <b>파일의 부분별로 작성자 확인하기</b>
  ```bash
  git blame (파일명)
  ```
- <b>특정 부분 지정해서 작성자 확인하기</b>
  ```bash
  git blame -L (시작줄) (끝줄, 또는 +줄수) (파일명)
  ```

### VS Code의 GitLens 확장 사용해보기

## 오류가 발생한 시점 찾아내기

### git bisect

- 이진 탐색 알고리즘으로 문제의 발생 시점을 찾아낸다.

#### v3 시점이 의심되는 상황

- <b>이진 탐색 시작</b>
  ```bash
  git bisect start
  ```
- <b>오류발생 지점임을 표시</b>
  ```bash
  git bisect bad
  ```
- <b>의심 지점으로 이동</b>
  ```bash
  git checkout (해당 커밋 해시)
  ```
- <b>오류 발생 않을 시 양호함 표시</b>
  ```bash
  git bisect good
  ```
- <b>원인을 찾을 때까지 반복</b>
  ```
  git bisect good/bad
  ```
- <b>이진 탐색 종료</b>
  ```bash
  git bisect reset
  ```

# 12. git의 추가 기능들

## Git Hooks

> Git상의 이벤트마다 자동으로 실행될 스크립트를 지정한다.

### Git Hooks 폴더 보기

- 프로젝틒 폴더 내 `.git` > `hooks` 폴더 확인
  - 파일 끝에 `.sample`을 없애면 훅 실행파일이 된다.

### gitmoji-cli로 활용예 보기

- [gitmoji-cli GitHub 페이지](https://github.com/carloscuesta/gitmoji-cli)

#### gitmoji-cli 설치

- <b>윈도우</b>
  - 먼저 Node.js 설치
  - 터미널에서 설치: `npm i -g gitmoji-cli`
- <b>맥</b>
  - `brew`로 설치: `brew install gitmoji`

#### 프로젝트의 훅에 적용

- 프로젝트 폴더에서 아래 명령어 실행
  ```bash
  gitmoji -i
  ```
  - `hooks` 폴더에 추가된 파일 확인하기
  - 프로젝트에 수정 뒤 `git add .`, `git commit`하여 진행
  - 커밋 추가 뒤 push하여 GitHub에서 확인

#### gitmoji-cli 훅을 해제하려면

- `hooks` 폴더에서 `prepare-commit-msg` 파일을 삭제해주면 된다.

## Git Submodules

### 서브 모듈

- 프로젝트 폴더 안에 <b>또 다른 프로젝트</b>가 포함될 때 사용
- 여러 프로젝트에 사용되는 공통모듈일 때 유용

### 사용해보기

#### 두 개의 프로젝트 생성

- `main-project`, `submodule`
- 양쪽 모두 파일 생성 및 작성 뒤 커밋
- 두 프로젝트 모두 GitHub에 각각 레포지토리 만들어 올릭
  - 혹은 GitHub에서 생성해도 좋다.

#### `main-project`에 서브모듈로 `submodule` 프로젝트 추가

- `main-project` 디렉토리상 터미널에서 아래 명령어 실행
  ```bash
  git submodule add (submodule의 GitHub 레포지토리 주소) (하위폴더명, 없을 시 생략)
  ```
  - 프로젝트 폴더 내 `submodule` 폴더와 `.gitmodules` 파일 확인
  - 스테이지된 변경사항 확인 뒤 커밋
  - 양쪽 모두 수정사항 만든 뒤 `main-project`에서 `git status`로 확인
    - `submodule`의 변경사항은 포함되지 않음 확인
  - `main-project`에서 변경사항 커밋 뒤 푸시
  - `submodule`에서 변경사항 커밋 뒤 푸시
  - `main-project`에서 상태 확인
  - `main-project`에서 커밋, 푸시 뒤 GitHub에서 확인

#### 서브모듈 업데이트

- `main-project` 새로운 곳에 <b>clone</b>하기
- 아래 명령어들로 서브모듈 init 후 클론
  ```bash
  git submodule init (특정 서브모듈 지정시 해당 이름)
  git submodule update
  ```
- GitHub에서 `submodule`에 수정사항 커밋
  - `main-project`에서 아래 명령어로 업데이트
  ```bash
  git submodule update --remote
  ```
  - 서브 모듈 안에 또 서브모듈이 있을 시: `--recursive` 추가

# 13. GitHub 잘 사용하기

## 프로젝트와 폴더에 대한 문서

### README.md 를 활용한 문서화

- GitHub의 프로젝트 페이지들 살펴보기
  - [네이버 지도 API 예제](https://github.com/navermaps/maps.jss)
  - [node-mysql2](https://github.com/sidorares/node-mysql2)
  - [Bootstrap](https://github.com/twbs/bootstrap)

### 문서 만들어보기

- 마크다운 문법
  - [markdownguide.org](https://www.markdownguide.org/extended-syntax/#highlight)
  - [GitHub 제공 가이드](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

1. 프로젝트 최상위 폴더에 `README.md` 파일 작성
2. VS Code에서 미리보기 기능
3. 푸시한 뒤 GitHub에서 프로젝트 페이지 살펴보기
4. 폴더 만들어 폴더별 `README.md` 만들어보기

## 풀 리퀘스트와 이슈

### Pull request

- 변경사항을 merge하기 전 리뷰를 거치기 위함
  - 팀원들의 동의를 거친 뒤 대상 브랜치에 적용

#### 풀 리퀘스트 사용해보기

- 새로운 브랜치 생성 후 변경사항 커밋하여 푸시
- GitHub 레포지토리 페이지에서 `Compare & pull request` 버튼 클릭
  - 또는 `~ branches`에서 `New pull request` 클릭
- 메시지 작성 후 `Create pull request` 클릭

#### 풀 리퀘스트 검토 후 처리하기

- GitHub 레포지토리 페이지에서 `Pull requests` 탭 클릭
- 대상 풀 리퀘스트 클릭하여 내용 검토
  - 의견이 있을 시 코멘트 달기
  - 반려해야 할 시 `Close pull request`
  - 승인할 시 `Merge pull request`

### Issue

- 버그나 문제 제보, 추가할 기능 등의 이슈 소통
- 예시
  - [네이버 지도 API 예제](https://github.com/navermaps/maps.js)
  - [Flutter](https://github.com/flutter/flutter)

#### 이슈 작성해보기

- GitHub 레포지토리 페이지에서 `Issues` 탭 클릭
- 필요시 label 또는 milestone 생성
  - milestone: 이슈의 주제 묶음 (특정 목표 등)
- 이슈 작성
  - 필요시 label, milestone, asignee 지정
- 이슈 확인 후 처리
  - 코멘트 달기
  - 관련 개발 착수 (브랜치명이나 커밋 footer에 이슈 번호 반영)
  - 해결 뒤: `Close issue`

## 오픈소스에 참여하기

### 오픈소스 프로젝트에 기여하기

- 프로젝트별 참여 가이드 확인

  - 예시: [React GitHub 페이지](https://github.com/facebook/react)

- <b>프로젝트 `fork` 해보기</b>
  - 원하는 유명 프로젝트 내 레포지토리로 포크해보기
  - 실습을 위해 [얄코 예제용 오픈소스 프로젝트](https://github.com/yalcodic/yalco-open-source) 포크하기
- <b>코드 기여하기</b>
  - 코드 수정 후 pull request
- <b>오픈소스 주인 과점</b>
  - 풀 리퀘스트 코멘트/반려.수락

## GitHub에 블로그 만들기

### GitHub Pages 사용하기

- [소개 페이지](https://pages.github.com/)
- 게정별 무료 웹 호스팅

#### 나의 GitHub Page 만들기

- 레포지토리 생성
  - ❗️레포지토리명: `(내 아이디).github.io`로 지을 것!
  - 로컬로 클론
- 최상위 디렉토리에 `index.html` 작성
  - 💡VS Code 팁: `!` 입력하고 엔터 누르면 기본 HTML 템플릿 생성
  - 내용 작성 뒤 push
- `https://(내 아이디).github.io`에서 사이트 확인
  - 시간이 어느 정도 걸린다.

# 14. GitHub 제대로 활용하기

## SSH로 접속하기

### SSH 프로토콜을 통한 인증

- <b>공개키</b> 암호화 방식 활용
- username과 토큰 사용할 필요 없음
- 컴퓨터 자체에 키 저장

#### SSH 키 등록하기

- 계정의 `Settings` - `SSH and GPG keys`
- 해당 페이지의 가이드 참조
  - <b>1. SSH키 존재 여부 확인</b>
    - 터미널(윈도우의 경우 Bash Shell)에서 `~/.ssh`로 이동
      ```bash
      cd ~/.ssh
      ```
    - `id_rsa.pub`, `id_ecdsa.pub`, `id_ed25519.pub` 파일 중 하나 존재 여부 확인
      ```bash
      ls
      ```
    - 있다면 바로 3번으로
  - <b>2. SSH 키 생성</b>
    - 터미널(윈도우의 경우 Bash Shell)에서 키 생성
      ```bash
      ssh-keygen -t ed25519 -C "(이메일 주소)"
      ```
    - 원할 시 `passphrase` 입력
    - 1번의 과정으로 키 생성 확인
  - <b>3. GitHub에 키 등록</b>
    - 공개키 열람하여 복사
      ```bash
      cat ~/.ssh/id_ed25519.pub
      ```
    - `New SSH Key` 클릭하여 키 이름과 함께 등록
  - <b>4. SSH로 사용해보기</b>
    - 원격을 SSH 주소로 변경한 뒤 테스트

## GPG로 커밋에 사인하기

### GPG 키를 통한 검증

- <b>GitHub 커밋 내역 살펴보기</b>
  - 로컬에서 푸시한 커밋과 GitHub에서 작성한 커밋 비교
  - `Verified`: 신뢰할 만한 출처에서 커밋되었다는 인증

#### GPG 사용

- <b>1. GPG 툴 설치</b>
  - 윈도우: [다운로드 사이트](https://www.gnupg.org/download/)
  - 맥: `brew install gnupg`
  - `gpg --version`으로 확인
- <b>2. GPG 키 생성</b>
  - 💡[이 링크의 가이드](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)에 따라 진행
- <b>3. `New PGP key` 클릭하여 등록</b>
  - 💡[이 링크의 가이드](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)에 따라 진행
  - ❗️맥의 경우 추가 절차(환경 변수) 있음
- <b>4. 사인하기</b>
  - 커밋에 사인: 명령어에 `-S` 옵션 추가
    ```bash
    git commit -S -m "(메시지)"
    ```
  - 태그에 사인: 명령어에 `-s` 옵션 추가
    ```bash
    git tag -s (태그명) (커밋 해시) -m (메시지)
    ```

## GitHub Actions

### GitHub Actions를 사용한 자동화

- CI/CD: 지속적 통합과 배포
  - [관련 영상](https://www.youtube.com/watch?v=UbI0Q_9epDM)
  - 동종: GitLab CI/CD, BitBucket Pipelines

#### GitHub Actions 살펴보기

- <b>github.io 페이지의 액션</b>
  - 해당 레포지토리 페이지에서 `Actions` 탭 살펴보기
  - 새로운 커밋 푸시한 직후 다시 살펴보기
- <b>다른 프로젝트에서 액션 추가해보기</b>
  - `Actions` 탭에서 액션들 살펴보고 적용해보기
  - `Marketplace` 살펴보고 적용해보기
  - 커밋 후 pull하여 로컬에서 확인

### GitHub Actions 체험해보기
