# Git

## Git Cheat Sheet

### 과거로 돌아가는 두 가지 방법

```bash
# reset: 원하는 시점으로 돌아간 뒤 이후 내역(히스토리)들을 지운다.
# -soft:
# -mixed(기본값):
# -hard:
git reset (reset 옵션) (돌아갈 커밋 해시)
git reset --hard # 뒤에 커밋 해시가 없으면 마지막 커밋을 가리킨다.

# revert: 되돌리기 원하는 시점의 커밋을 거꾸로 실행한다.
git revert (되돌릴 커밋 해시)
# 커밋하지 않고 revert, 원하는 다른 작업을 추가한 다음 함께 커밋하고 싶을 때 사용
git revert --no--commit (되돌릴 커밋 해시)
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

### log

```bash
# 위치한 브랜치에서의 커밋 내역 확인
git log
# 여러 브랜치의 내역 보기
git log --all --decorate --oneline --graph
```

### 서로 다른 branch를 합치는 두 가지 방법

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
```
