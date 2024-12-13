https://math.libretexts.org/Courses/Coastline_College/Math_C045%3A_Beginning_and_Intermediate_Algebra_(Tran)/06%3A_Systems_of_Linear_Equations/6.07%3A_Solve_Systems_of_Equations_Using_Determinants

```
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400

94x + 34y = 10000000008400
22x + 67y = 10000000005400

[ax, ay] = [priceX]
[bx, by]   [priceY]

D = a * d - b * c;

D = ax * by - ay * bx;
```

# Cramer's Rule

```
Dx =[priceX, bx]
    [priceY, by]

Dx = priceX * by - priceY * bx

Dy =[ax, priceX]
    [ay, priceY]

Dy = ax * priceY - priceX * ay

x = Dx / D
y = Dy / D
```
