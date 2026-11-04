# Python 함수 (Functions)

## 1. 정의

함수는 특정 작업을 수행하도록 작성한 재사용 가능한 코드 블록이다.

## 2. 작동 원리

함수를 정의한 다음 호출하면 함수 내부의 코드가 실행된다.

## 3. 예제 코드

```python
def greet(name):
    return f"안녕하세요, {name}님!"

message = greet("Jaehwan")
print(message)
```

## 4. 코드 설명

- `def`: 함수를 정의하는 키워드
- `greet`: 함수 이름
- `name`: 매개변수
- `return`: 함수의 실행 결과를 반환

## 5. 핵심 정리

함수를 활용하면 중복 코드를 줄이고 프로그램을 구조화할 수 있다.
