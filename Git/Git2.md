# Git

> 출처: [제대로 파는 Git & GitHub - by 얄코](https://www.inflearn.com/course/%EC%A0%9C%EB%8C%80%EB%A1%9C-%ED%8C%8C%EB%8A%94-%EA%B9%83/dashboard)

## 목차

- [08. 취소와 되돌리기 보다 깊이 알기](#08-취소와-되돌리기-보다-깊이-알기)
- [09. 태그](#09-태그)

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

#### 로컬 태그 우너격에서 삭제

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
