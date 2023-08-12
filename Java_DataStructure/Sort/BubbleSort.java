/**
 * 버블 정렬 과정
 * 1. 비교 연산이 필요한 루프 범위를 설정한다.
 * 2. 인접한 데이터 값을 비교한다.
 * 3. swap 조건에 부합하면 swap 연산을 수행한다.
 * 4. 루프 범위가 끝날 때까지 2 ~ 3을 반복한다.
 * 5. 정렬 영역을 설정한다. 다음 루프를 실행할 때는 이 영역을 제외한다.
 * 6. 비교 대상이 없을 때까지 1 ~ 5를 반복한다.
 * 
 * 장점:
 *   1. 추가적인 메모리 소비가 작다.
 *   2. 구현이 매우 쉽다.
 *   3. 안정정렬이 가능하다.
 * 
 * 단점
 *   1. 다른 정렬 알고리즘에 비해 교환 과정이 많아 많은 시간을 소비한다.
 * 
 * 시간 복잡도: O(n^2)
 */

public class BubbleSort {

  public static void main(String[] args) {
    BubbleSort bubbleSort = new BubbleSort();
    int[] arr = {1, 54, 6, 3, 2};
    bubbleSort.sort(arr, 5);
    System.out.println(Arrays.toString(arr)); // [1, 2, 3, 6, 54]
  }

  private void sort(int[] arr, int size) {

    // round는 (배열 크기 - 1)만큼 진행
    for (int i = 1; i < size; i++) {

      // 각 라운드별 비교횟수는 배열 크기의 현재 라운드를 뺀 만큼 비교함
      for (int j = 0; j < size - i; j++) {

        // 현재 원소가 다음 원소보다 큰 경우 원소의 위치를 바꾼다.
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
  }

  private void swap(int[] a, int i, int j) {
    int temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}
