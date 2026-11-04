# 01. Python 기초 — 변수, 메모리, 자료형

> **학습 주제:** 변수와 상수, print(), 객체와 메모리, id(), is와 ==, 예약어, 자료형, 컬렉션  
> **학습 목표:** Python에서 데이터가 어떻게 만들어지고, 메모리에 저장되며, 변수로 참조되는지 이해한다.

---

## 1. 변수(Variable)와 상수(Constant)

### 1.1 변수란?

변수는 **데이터를 참조하기 위해 사용하는 이름**이다.

Python에서는 데이터를 객체(Object)로 관리하고, 변수는 해당 객체를 참조한다.

```python
var1 = '안녕파이썬'
print(var1)
print(var1)

var1 = 56
print(var1)
```

**실행 결과**

```text
안녕파이썬
안녕파이썬
56
```

**코드 분석**

- `var1`: 변수 이름
- `=`: 할당 연산자
- `'안녕파이썬'`: 문자열 객체
- `print(var1)`: 변수가 참조하는 객체의 값을 출력
- `var1 = 56`: 변수에 정수 객체를 새롭게 할당

Python은 **동적 타입 언어(Dynamically Typed Language)**이므로 하나의 변수에 서로 다른 자료형의 객체를 할당할 수 있다.

### 1.2 변수의 대소문자 구분

```python
var1 = 56
Var1 = 123

print(var1)
print(Var1)
```

**실행 결과**

```text
56
123
```

Python은 대소문자를 구분한다.

따라서 `var1`과 `Var1`은 서로 다른 변수다.

### 1.3 상수(Constant)

상수는 프로그램 실행 중 변경하지 않을 것을 의도한 값이다.

```python
PI = 3.14
print(PI)
```

Python에서는 상수를 대문자로 작성하는 것이 관례다.

단, Python은 일반 변수의 값 변경을 막지 않기 때문에 `PI`도 실제로는 재할당할 수 있다.

**핵심 정리**

- 변수: 객체를 참조하는 이름
- 상수: 변경하지 않기로 약속한 값
- Python 변수는 다른 자료형의 객체를 다시 참조할 수 있다.
- Python은 변수명의 대소문자를 구분한다.

---

## 2. print() 함수와 문자열

`print()`는 데이터를 화면에 출력하는 Python의 내장 함수다.

### 2.1 기본 출력

```python
a = 10

print('a = ', a)
print("'a = '", a)
print('"a = "', a)
```

**실행 결과**

```text
a =  10
'a = ' 10
"a = " 10
```

### 2.2 코드 분석

`print('a = ', a)`

- `'a = '`: 문자열
- `a`: 변수
- `,`: 여러 인수를 구분
- `print()`: 인수를 기본적으로 공백으로 구분하여 출력

`print("'a = '", a)`

- 큰따옴표로 문자열을 감싸면 내부에 작은따옴표를 사용할 수 있다.

`print('"a = "', a)`

- 작은따옴표로 문자열을 감싸면 내부에 큰따옴표를 사용할 수 있다.

### 2.3 줄바꿈

```python
print()
print('type(자료형) 확인')
print('\ntype(자료형) 확인')
```

- `print()`: 빈 줄 출력
- `\n`: 줄바꿈 문자(Newline)

---

## 3. Python 변수와 메모리

### 3.1 객체(Object)란?

Python에서는 정수, 실수, 문자열, 리스트 등의 데이터를 객체로 관리한다.

객체는 자신의 자료형과 값, 식별자를 가진다.

```python
a = 10
b = 20.5
c = b

print(a, b, c)
```

**실행 결과**

```text
10 20.5 20.5
```

### 3.2 메모리 참조 구조

```text
[Python 프로그램]

    변수 a ─────────▶ 정수 객체 10

    변수 b ─────┐
                 ├──▶ 실수 객체 20.5
    변수 c ─────┘
```

**실행 순서**

1. `a = 10` 실행
2. 정수 객체 `10`을 변수 `a`가 참조
3. `b = 20.5` 실행
4. 실수 객체 `20.5`를 변수 `b`가 참조
5. `c = b` 실행
6. 변수 `c`도 `b`가 참조하는 객체를 참조

즉, `c = b`는 반드시 새로운 객체를 생성하는 것이 아니다.

### 3.3 CPU와 RAM의 관계

```text
[SSD / 저장장치]
       │
       │ Python 프로그램 실행
       ▼
[RAM / 주기억장치]
       │
       ├── Python 실행 환경
       ├── 변수의 참조 정보
       └── 데이터 객체
       │
       ▼
[CPU]
       │
       ├── 명령어 실행
       ├── 연산 처리
       └── 메모리 데이터 접근
       │
       ▼
[출력 결과]
```

프로그램을 실행하면 운영체제가 필요한 코드와 데이터를 메모리에 적재한다.

CPU는 명령어를 실행하면서 메모리에 있는 데이터에 접근하고 연산을 수행한다.

---

## 4. id() 함수

`id()`는 객체의 고유한 식별자를 반환하는 Python 내장 함수다.

```python
a = 10
b = 20.5
c = b

print('식별자 출력:', id(a), id(b), id(c))
```

**핵심 원리**

- `id(a)`: a가 참조하는 객체의 식별자
- `id(b)`: b가 참조하는 객체의 식별자
- `id(c)`: c가 참조하는 객체의 식별자

`b`와 `c`는 동일한 객체를 참조하므로 식별자가 같다.

CPython에서는 `id()` 값이 일반적으로 객체의 메모리 주소에 해당한다.

하지만 Python 언어 자체가 모든 구현에서 메모리 주소를 반환한다고 보장하지는 않는다.

---

## 5. is와 == 연산자의 차이

Python에서는 두 가지 비교를 구분해야 한다.

| 연산자 | 의미 | 비교 대상 |
|---|---|---|
| `is` | 동일한 객체인지 비교 | 객체의 동일성 |
| `==` | 값이 같은지 비교 | 값의 동등성 |

### 5.1 기본 예제

```python
a = 10
b = 20.5
c = b

print(a is b, a == b)
print(b is c, b == c)
```

**실행 결과**

```text
False False
True True
```

**분석**

`a is b`

- a와 b가 서로 다른 객체이므로 False

`a == b`

- 10과 20.5는 값이 다르므로 False

`b is c`

- b와 c가 동일한 객체를 참조하므로 True

`b == c`

- 값이 같으므로 True

---

## 6. 리스트와 객체의 동일성

### 6.1 리스트 비교

```python
aa = [100]
bb = [100]

print(aa is bb, aa == bb)
print(id(aa), id(bb))
```

**실행 결과**

```text
False True
```

객체 식별자 출력값은 실행할 때마다 달라질 수 있다.

### 6.2 작동 원리

```text
변수 aa ─────▶ 리스트 객체 A
                    │
                    └── [100]

변수 bb ─────▶ 리스트 객체 B
                    │
                    └── [100]
```

`aa`와 `bb`는 각각 새로 생성한 리스트 객체를 참조한다.

- `aa is bb`: False
- `aa == bb`: True

리스트 객체는 서로 다르지만 내부 원소가 같기 때문이다.

### 6.3 정수와 리스트의 차이

```python
aa = 100
bb = 100

print(aa is bb)
print(aa == bb)
```

일부 작은 정수는 Python 구현에서 객체를 재사용할 수 있다.

따라서 `is`의 결과를 이용해 숫자의 값이 같은지 판단하면 안 된다.

**값을 비교할 때는 `==`를 사용한다.**

---

## 7. 모듈(Module)과 예약어(Keyword)

### 7.1 모듈이란?

모듈은 재사용할 수 있는 Python 코드가 들어 있는 단위다.

함수, 클래스, 변수 등의 기능을 모듈로 묶어서 관리할 수 있다.

### 7.2 import 사용

```python
import keyword

print('키워드 목록:', keyword.kwlist)
```

**코드 분석**

- `import`: 모듈을 가져오는 구문
- `keyword`: Python 표준 라이브러리 모듈
- `keyword.kwlist`: Python의 예약어 목록

### 7.3 모듈 로딩 과정

```text
[Python 프로그램]
        │
        ▼
  import keyword
        │
        ▼
[모듈 탐색 및 로딩]
        │
        ▼
[Python 실행 환경]
        │
        ▼
keyword.kwlist 접근
        │
        ▼
예약어 목록 출력
```

Python은 모듈이 이미 로드되어 있는지 확인하고, 필요한 경우 모듈을 탐색하고 실행하여 사용할 수 있게 한다.

### 7.4 예약어란?

예약어는 Python 문법에서 특별한 의미를 가진 단어다.

예시:

```text
False
True
None
if
else
elif
for
while
def
class
return
import
```

예약어는 일반 변수명으로 사용할 수 없다.

```python
# 잘못된 예시
# class = 100

# 올바른 예시
class_number = 100
```

참고로 `keyword`는 예약어가 아니라 모듈 이름이다. 변수명으로 사용할 수는 있지만 모듈 이름을 가릴 수 있으므로 피하는 것이 좋다.

---

## 8. 자료형(Data Type)

### 8.1 자료형이란?

자료형은 데이터의 종류를 나타낸다.

Python은 객체의 자료형에 따라 사용할 수 있는 연산과 기능을 구분한다.

### 8.2 type() 함수

`type()`은 객체의 자료형을 확인하는 내장 함수다.

```python
print(5, type(5))
print(5.4, type(5.4))
print(3+4j, type(3+4j))
print(True, type(True))
print('kbs', type('kbs'))
```

**실행 결과**

```text
5 <class 'int'>
5.4 <class 'float'>
(3+4j) <class 'complex'>
True <class 'bool'>
kbs <class 'str'>
```

### 8.3 기본 자료형

| 자료형 | 설명 | 예시 |
|---|---|---|
| `int` | 정수형 | 5 |
| `float` | 실수형 | 5.4 |
| `complex` | 복소수형 | 3+4j |
| `bool` | 논리형 | True |
| `str` | 문자열형 | 'kbs' |

**추가 개념**

AI와 머신러닝에서는 숫자 데이터를 많이 사용하지만 모든 데이터를 반드시 `float`으로 변환하는 것은 아니다.

데이터의 종류와 모델에 따라 정수, 실수, 수치 배열, 텐서 등 다양한 표현을 사용한다.

---

## 9. 묶음형 자료형(Collection)

여러 데이터를 하나로 묶어 관리하는 자료형이다.

Python에서 자주 사용하는 묶음형 자료는 다음과 같다.

- Tuple
- List
- Set
- Dictionary

### 9.1 Tuple(튜플)

```python
print((1,), type((1,)))
```

**실행 결과**

```text
(1,) <class 'tuple'>
```

튜플의 특징:

- 순서가 있다.
- 인덱스로 접근할 수 있다.
- 생성한 튜플의 원소를 직접 변경할 수 없다.

원소가 하나인 튜플은 `(1,)`처럼 쉼표를 사용해야 한다.

### 9.2 List(리스트)

```python
print([1], type([1]))
```

**실행 결과**

```text
[1] <class 'list'>
```

리스트의 특징:

- 순서가 있다.
- 인덱스로 접근할 수 있다.
- 원소를 추가, 삭제, 변경할 수 있다.

### 9.3 Set(집합)

```python
print({1}, type({1}))
```

**실행 결과**

```text
{1} <class 'set'>
```

집합의 특징:

- 중복 원소를 허용하지 않는다.
- 리스트처럼 위치 인덱스로 원소에 접근할 수 없다.
- 합집합, 교집합, 차집합 등의 연산이 가능하다.

### 9.4 Dictionary(딕셔너리)

```python
print({'key': 3}, type({'key': 3}))
```

**실행 결과**

```text
{'key': 3} <class 'dict'>
```

딕셔너리는 Key와 Value를 쌍으로 저장한다.

```python
student = {
    'name': 'Python',
    'score': 95
}

print(student['score'])
```

**실행 결과**

```text
95
```

### 9.5 자료형 비교

| 자료형 | 기호 | 순서 | 변경 가능 |
|---|---|---|---|
| Tuple | `( )` | 있음 | 불가능 |
| List | `[ ]` | 있음 | 가능 |
| Set | `{ }` | 위치 순서 없음 | 원소 추가·삭제 가능 |
| Dictionary | `{key: value}` | 삽입 순서 유지 | 가능 |

---

## 10. 전체 학습 코드

```python
# 기본 출력
print("안녕하세요")

# 변수
var1 = '안녕파이썬'
print(var1)
print(var1)

var1 = 56
print(var1)

Var1 = 123
print(Var1)

# 상수 관례
PI = 3.14
print(PI)

# 문자열 출력
a = 10
print('a = ', a)
print("'a = '", a)
print('"a = "', a)

# 변수와 객체 참조
b = 20.5
c = b

print(a, b, c)
print('식별자 출력:', id(a), id(b), id(c))

# 동일성과 동등성
print(a is b, a == b)
print(b is c, b == c)

print()

# 리스트 객체 비교
aa = [100]
bb = [100]

print(aa is bb, aa == bb)
print(id(aa), id(bb))

print()

# 모듈과 예약어
import keyword

print('키워드 목록:', keyword.kwlist)

print()

# 자료형 확인
print('type(자료형) 확인')
print('\ntype(자료형) 확인')

print(5, type(5))
print(5.4, type(5.4))
print(3+4j, type(3+4j))
print(True, type(True))
print('kbs', type('kbs'))

# 묶음형 자료
print((1,), type((1,)))
print([1], type([1]))
print({1}, type({1}))
print({'key': 3}, type({'key': 3}))
```

---

## 11. 핵심 정리

| 개념 | 핵심 내용 |
|---|---|
| 변수 | 객체를 참조하는 이름 |
| 상수 | 변경하지 않을 것을 의도한 값 |
| `print()` | 출력 함수 |
| `id()` | 객체 식별자 반환 |
| `type()` | 자료형 확인 |
| `is` | 동일한 객체인지 확인 |
| `==` | 값이 같은지 확인 |
| `import` | 모듈 가져오기 |
| `keyword` | 예약어 목록을 확인할 수 있는 모듈 |
| Tuple | 변경 불가능한 시퀀스 |
| List | 변경 가능한 시퀀스 |
| Set | 중복을 허용하지 않는 집합 |
| Dictionary | Key-Value 자료구조 |

---

## 12. 다음 학습 주제

이번 학습에서 추가로 연결할 개념은 다음과 같다.

1. 가변 객체(Mutable)와 불변 객체(Immutable)
2. Python의 메모리 관리 방식
3. 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)
4. 연산자(Operator)
5. 형변환(Type Casting)

**다음 학습: 02. Python 연산자와 형변환**
