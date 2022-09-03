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

  | 옵션 | 설명                                |
  | ---- | ----------------------------------- |
  | -n   | 삭제될 파일들 보여주기              |
  | -i   | 인터렉티브 모드 시작                |
  | -d   | 폴더 포함                           |
  | -f   | 강제로 바로 지워버리기              |
  | -x   | `.gitignore`에 등록된 파일들도 삭제 |

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
- 태그를 다는 형식으로는 `Semantic Versioning`이 널리 쓰인다.  
  💡 [Semantic Versioning 정보](https://semver.org/lang/ko/)

### 태그 달아보기

|태그 종류|설명|
|lightweight|특정 커밋을 가리키는 용도(한 마디로 태크만 붙이는 것!)|
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

- 해당 커밋의 어떤 작업이 이루어졌는지 확인할 수 있다.

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
git tag -l '*0'
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

#### 로컬의 모든 태그 원격에 올리기

```bash
git push --tags
```

### GitHub의 release

- 태그가 붙은 버전들에 대해서 사용자에게 레포지토리 페이지에서 다운로드할 수 있도록 릴리즈 버전을 지원한다.
  - 다운로드 가능한 배포판 기능
- [네이버 나눔고딕 코딩글꼴 예시](https://github.com/naver/nanumfont)

#### 릴리즈 만들어보기

- GitHub에서 태그 목록으로
- 원하는 태그에서 `Create release`
- 제목과 내용(마크다운) 입력 후 `Publish release`

### Fastforward vs 3-way merge

> Git에서 `merge`가 이뤄지는 두 방식 <b>Fastforward</b>와 <b>3-way-merge</b>를 비교한다.

# 10. Branch 보다 깊이 알기

## Fastforward vs 3-way merge

> Git이 merge를 하는 두 가지 전략

### 3-way merge

```
       "B"
      - o -
    /       \
- o - o - o - o (merge)
         "A"
```

- 위에서 살펴본 `merge` 실습할 때 말 그대로 병합되는 모양
- 두 브랜치를 병합할 때, 두 커밋 모두에 속한 어떤 파일들이 양쪽에서 내용이 다른 경우
  - Git은 그 파일들 각각 `B 브랜치에서 변경된 것인지`, `A 브랜치에서 변경된 것인지`, `양쪽 모두에서 변경돼서 충돌이 일어나고 있는 상황인지`를 판단해야 한다.
  - 두 커밋만 보고는 알 수 없기 때문에 두 브랜치의 공통 조상이 되는 커밋의 내용과 둘을 대조하기 때문에 3-way(공통 조상, A, B)라고 하는 것이다.

### Fast forward

```
        o - o "B"
       /
- o - o "A"
```

- 두 브랜치가 공통 커밋을 조상으로 갖고 있는데 한 쪽 브랜치(`B`)에만 이후의 커밋이 있을 때 그 상태에서 그 둘을 병합하기 위한 다른 커밋을 만들지 않고, `A` 브랜치의 헤드를 `B` 브랜치까지 옮기는 방식
  - 새로운 커밋으로 병합해서 만들어봤자 B 최신 커밋 상태 그대로 일 테니깐!
  - 즉, A 브랜치의 헤드를 `fast foward` -> 빨리감기 해버리는 것이 더 효율적이다!
    - 그리고 병합된 브랜치는 없애면 된다.
- 단점: 작업을 하고 나서 어떤 브랜치를 사용했고 언제 병합했는지 기록이 남지 않는다.
  - 원 브랜치에 변화가 없어도 `fast-forward`하지않고, 병합 커밋을 만들어서 `merge`하려면
  - `git merge --no--ff (병합할 브랜치명)` 실행

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

```
- o --- o --- o --- o --- o "main"
 F.C. Apple Carrot Onion Cherry
```

- 즉, 특정 커밋만 복제해서 가져오는 것이라고 생각하면 된다.

### 다른 가지의 잔가지만 가져오기

#### 다른 브랜치에서 파생된 브랜치 옮겨붙이기

- `citrus` 브랜치를 `main` 브랜치에 옮겨붙일려는 경우
  - 그냥 `rebase`를 하면 `fruit` 브랜치부터 전부가 옮겨진다.
  - 따라서 `rebase --onto` 옵션 사용!

#### `fruit` 브랜치에서 파생된 `citrus` 브랜치를 `main` 브랜치로 옮겨붙이기

```bash
git rebase --onto (도착 브랜치) (출발 브랜치) (이동할 브랜치)
```

```
                        "main"     "citrus"
- o --- o --- o --- o --- o --- o --- o
F.C. Apple Carrot Onion Cherry Lemon Lime
```

- `git rebase --onto main fruit citrus`하면 `main` 브랜치가 위와 같은 형태가 된다.
- `main` 브랜치로 이동 후 `git merge citrus`로 fast forward❗️

### `rebase --onto`를 되돌리려면?

- 위의 사항들을 진행한 뒤 `git reflog`를 사용해서 내역을 살펴보면 `rebase --onto` 명령 시 여러 내역들이 진행된 것을 확인할 수 있다.
  - 그 내역을 보면 `rebase --onto`가 여러 동작들을 포함한다는 것을 알 수 있다.
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

## 다른 가지의 마디들 묶어서 가져오기

### 다른 커밋들을 하나로 묶어 가져오기

- `root` 브랜치의 커밋들을 하나의 커밋으로 합쳐서 `main` 브랜치에 합치고 싶은 경우
  - `merge --squash` 옵션 사용

### `root` 브랜치의 마디들을 하나로 묶어 `main` 브랜치로 가져오기

```bash
git merge --squash (대상 브랜치)
```

- **변경사항들 스테이지 되어 있음**
- `git commit` 후 메시지 입력
- `merge --squash`는 `merge`되거나 `rebase`된 흔적이 남아있지 않는다.

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

- `main`
  - 실제로 사용자들에게 출시될 버전들이 최종적으로 `merge`된다.
- `develop`
  - `main`의 버전들을 만들어 내기 위한 개발작업을 해당 브랜치에서 한다.
  - 새로운 기능을 추가, 수정 등 작업을 한다.
- `feature`
  - `develop` 브랜치에서 굵직한 기능은 따로 브랜치를 만들어서 진행하는데 그 때 사용하는 브랜치
  - 따라서 `feature--(무슨기능)`처럼 브랜치는 여러 개가 될 수 있다.
  - 기능이 완성되면 `develop` 브랜치로 다시 보내서 개발을 해나간다.
- `release`
  - 개발을 어느정도 완성해서 출시를 해도 될 것 같으면 `release` 브랜치로 옮긴다.
  - QA팀 등 테스트를 하는 사람들에 의해서 검증이 이루어지는 곳
  - 성능, 버그 통과되면 `main` 브랜치로 이동한다.
- `hotfix`
  - 기존 출시된 버전에서 오류가 발견이 되면 해당 브랜치를 사용한다.

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
    - `git diff HEAD~~ HEAD~10`
  - 현재 커밋과 비교하려면 이전 커밋만 명시
  - `git diff --name-only HEAD~3 HEAD~7`
    - 어떤 파일들이 변화있었는지 확인할 수 있다.
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

### VS Code의 GitLens 확장해서 사용해보기

## 오류가 발생한 시점 찾아내기

- 어느 커밋부터 오류가 발생했는지 찾기 위해서 코드만 보고서는 에러가 발생하는지 알기 어렵기 때문에
- 해당 버전으로 돌아가서 해당 버전의 프로그램 전체를 실행시켜봐야 에러났는지 확인할 수 있다.

### git bisect

- 이진 탐색 알고리즘으로 문제의 발생 시점을 찾아낸다.
  - 버전 하나하나 순서대로 실행해보면서 찾으면 시간이 너무 오래 걸린다.

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

- Git상의 이벤트마다 자동으로 실행될 스크립트를 지정한다.
  - ex) 커밋을 할 때마다 자동으로 푸시까지

### Git Hooks 폴더 보기

- 프로젝틒 폴더 내 `.git` > `hooks` 폴더 확인
  - 파일의 이름은 각각 언제 실행되는가를 나타낸다.
    - `pre-commit`: 커밋이 이뤄지기 전(커밋 명령어 직후~)
    - `pre-push`: 푸시가 이뤄지기 전(푸시 명령 직후~)
  - 파일 끝에 `.sample`을 없애면 훅 실행파일이 된다.
    - 파일을 수정하기 위해서는 `Shell script`를 배워야 한다.

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

```
- 📁 main-project
  - 📁 main-project-files
  - 📁 module-project-1
  - 📁 module-project-2
```

- 위처럼 프로젝트 폴더 안에 <b>또 다른 프로젝트</b>가 포함될 때 사용
- 여러 프로젝트에 사용되는 공통모듈일 때 유용
  - main-proejct도 Git으로 관리되고, 그 안에 들어가는 다른 project들도 각각 Git으로 개별적인 프로젝트이다.
  - 서브 프로젝트는 메인 프로젝트 안에 위치하지만 메인 프로젝트와는 별개로 다룬다.
- 그냥 Git을 사용하면 해당 프로젝트 폴더 안에 있는 모든 파일들의 변화를 Git이 관리하는데
  - 위 경우는 main-project의 Git은 딱 그 폴더에 해당하는 파일들만 관리하고,
  - 각 폴더(sub-proejct) 안에 들어있는 또다른 프로젝트들에는 관여를 안할 때 사용한다.
  - 그렇다고 `.gitignore`처럼 완전히 무시하는 것이 아니라 메인-서브 관계를 가지고 있다.

### 사용해보기

#### 두 개의 프로젝트 생성

- `main-project`, `submodule`
- 양쪽 모두 파일 생성 및 작성 뒤 커밋
- 두 프로젝트 모두 GitHub에 각각 레포지토리 만들어 올릭
  - 혹은 GitHub에서 생성해도 좋다.

#### `main-project`에 서브모듈로 `submodule` 프로젝트 추가

```bash
git submodule add (submodule의 GitHub 레포지토리 주소) (하위폴더명, 없을 시 생략)
```

- 프로젝트 폴더 내 `submodule` 폴더와 `.gitmodules` 파일 확인
- 스테이지된 변경사항 확인 뒤 커밋
- 양쪽 모두 수정사항 만든 뒤 `main-project`에서 `git add .` 후`git status`로 확인
  - <b>`submodule`의 변경사항은 포함되지 않음 확인</b>
- `main-project`에서 변경사항 커밋 뒤 푸시
  - GitHub에서 확인하면 `main-project`의 변경사항만 푸시됨
- `submodule`에서 변경사항 커밋 뒤 푸시
  - 당연히 `submodule` 레포지토리에서는 최신 커밋 상태가 되지만, `main-project`에서는 아님
- `main-project`에서 상태 확인
  - (new commit)이라는 메시지가 보인다.
  - 이를 `git add .` 스테이지하고 커밋 후 푸시하면 원격에서도 반영이 된다.
- `main-project`에서 커밋, 푸시 뒤 GitHub에서 확인

#### 서브모듈 업데이트

- `main-project` 새로운 곳에 <b>clone</b>하기
- 아래 명령어들로 서브모듈 init 후 클론
  ```bash
  git submodule init (특정 서브모듈 지정시 해당 이름)
  git submodule update
  ```

#### GitHub에서 `submodule`에 수정사항 커밋

- `submodule`을 관리하는 팀원이 업데이트하면 받아오기
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

- 한 팀원이 코드를 작성해서 자시 브랜치에 푸시하면 그것을 `main`이나 `develop` 브랜치로 가기 전에 다른 팀원들이 그 코드를 미리 리뷰해서 몇 명 이상 동의하면 그 때 받아오는 방식
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

- 버그나 문제 제보, 추가할 기능 등의 이슈 소통(레포지토리의 게시판 같은 기능)
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
  - SSH를 사용하는 협엄(GitHub, Bitbucket, GitLab) 및 기타 서비스 사이트에 사용 가능

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
   - GitHub에서 바로 수정했다면 당연히 `Verified` 인증이 뜬다.

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

- 코딩을 작성해서 직접 돌리고, 빌드하고, 서버에 올려서 배포했지만 `CI/CI`는 자동으로 해준다.
- CI/CD: 지속적 통합과 배포
  - [관련 영상](https://www.youtube.com/watch?v=UbI0Q_9epDM)
  - 동종: GitLab -> CI/CD, BitBucket -> Pipelines

### GitHub Actions 살펴보기

- <b>github.io 페이지의 액션</b>
  - `index.html` 수정 후 푸시한 다음 해당 레포지토리 페이지에서 `Actions` 탭 살펴보기
  - 푸시가 되고 나면 어떠한 과정이 거쳐지는지 확인할 수 있다.
- <b>다른 프로젝트에서 액션 추가해보기</b>
  - `Actions` 탭에서 액션들 살펴보고 적용해보기
  - `Marketplace` 살펴보고 적용해보기
  - 커밋 후 pull하여 로컬에서 확인

### GitHub Actions 체험해보기

#### PR시마다 코드 테스트 후 실패시 자동 close

- `.githu/workflows/test.yaml` 살펴보기
- 코드 수정(성공&실패)하여 `main` 브랜치로 PR 날려보기

## GitHub 추가 팁

### OctoTree

- GitHub 레포지토리의 디렉토리를 보다 편하게 브라우징
- 크롬 익스텐션 (엣지에서 사용 가능)

### GitHub CLI

- GitHub 작업 전용 CLI 툴
  - [사이트 바로가기](https://cli.github.com/)

### 주요 명령어

- <b>로그인/로그아웃</b>
  ```bash
  gh auth (login/logout)
  ```
- <b>레포지토리들 보기</b>
  ```bash
  gh repo list
  ```
- <b>프로젝트 클론</b>
  ```bash
  gh repo clone (사용자명)/(레포지토리명)
  ```
- <b>프로젝트 생성/삭제</b>
  ```bash
  gh repo (create/delete)
  ```
- <b>이슈 목록 보기</b>
  ```bash
  gh issue list
  ```
- <b>이슈 열람/닫기</b>
  ```bash
  gh issue (view/close) (이슈 번호)
  ```
- <b>이슈 생성</b>
  ```bash
  gh issue create
  ```
- <b>풀 리퀘스트 만들기/목록 보기</b>
  ```bash
  gh pr (create/list)
  ```
- <b>풀 리퀘스트 보기/코멘트/닫기/병합</b>
  ```bash
  gh pr (view/comment/close/merge) (PR 번호)
  ```
