# 변수와 자료형

> 예제 콘텐츠: 게시 구조를 설명하기 위해 Codex가 작성한 샘플입니다. 사용자가 작성한 실제 학습 기록이 아닙니다.

## 변수에 값 연결하기

변수 이름을 통해 값을 참조할 수 있습니다. `=`는 값을 변수 이름에 연결하는 대입 연산자입니다.

```python
name = "Jaehwan"
age = 20
height = 175.5
is_learning = True

print(name)
print(type(age))  # <class 'int'>
```

## 기본 자료형

| 자료형 | 예시 | 설명 |
| --- | --- | --- |
| `str` | `"Hello"` | 문자열 |
| `int` | `20` | 정수 |
| `float` | `175.5` | 실수 |
| `bool` | `True` | 참 또는 거짓 |

## 확인할 내용

- 변수 이름은 값 자체가 아니라 값을 참조하는 이름입니다.
- `type()`으로 값의 자료형을 확인할 수 있습니다.
- 같은 이름에 다른 자료형의 값을 다시 대입할 수 있습니다.

## 간단한 예제

```python
value = 10
print(type(value))  # <class 'int'>

value = "ten"
print(type(value))  # <class 'str'>
```

이 문서는 예제입니다. 본인의 설명과 실습 결과로 바꾼 뒤 대응하는 HTML도 함께 갱신하세요.
