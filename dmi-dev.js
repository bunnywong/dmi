study(title="My - Directional Movement Index", shorttitle="DMI hight signal")

// ================================================================================
// Default
a1 = input(8, title="a1. +DI")
a2 = input(8, title="a2. +DI")
a3 = input(4, title="a3. ADX")
a4 = input(2, title="a4. ADX")

b1 = input(1, title="b1. ADX")
b2 = input(8, title="b2. ADX")
b3 = input(4, title="b3. ADX")
b4 = input(2, title="b4. ADX")

c1 = input(1, title="c1. ADX")
c2 = input(8, title="c2. ADX")
c3 = input(12, title="c3. -DI")
c4 = input(12, title="c4. -DI")

// ================================================================================
// Declear variable
up   = change(high)
down = -change(low)

// ================================================================================
// Function
myplus(a1) =>
    trur = rma(tr, a1)
    answer = fixnan(100 * rma(up > down and up > 0 ? up : 0, a1) / trur)
mymins(a1) =>
    trur = rma(tr, a1)
    answer = fixnan(100 * rma(down > up and down > 0 ? down : 0, a1) / trur)
myadx(a1, a2) =>
    sum = myplus(a1) - mymins(a1)
    trur = rma(tr, a1)
    answer = 100 * rma(abs(myplus(a1) - mymins(a1)) / (sum == 0 ? 1 : sum), a2)

// ================================================================================
// Result

// A
// plot(myplus(a1), color=orange, linewidth=1, title="+DI")
// plot(myadx(a3, a4), color=orange, linewidth=1, title="ADX")
plot(myplus(a1) - myadx(a3, a4), color=orange, linewidth=3, title="Hight signal - A: (+DI)-(ADX)")
// plot(abs(myplus(a1) - myadx(a3, a4)), color=blue, linewidth=3, title="[ABS]Hight signal - A: (+DI)-(ADX)")

// B
// plot(myadx(b1, b2), color=green, linewidth=1, title="ADX")
// plot(myadx(b3, b4), color=green, linewidth=1, title="ADX")
plot(myadx(b1, b2) - myadx(b3, b4), color=green, linewidth=3, title="Hight signal - B: (ADX)-(ADX)")

// C
// plot(myadx(c1, c2), color=red, linewidth=1, title="ADX")
// plot(mymins(c3), color=red, linewidth=1, title="-DI")
plot(myadx(c1, c2) - mymins(c3), color=black, linewidth=3, title="Hight signal - C: (ADX)-(-DI)")

// ================================================================================
// High signal
//   (8.8)-(4.2) < (1.8)-(4.2) < (1.8)-(12.12)
//   (+DI)-(ADX) < (ADX)-(ADX) < (ADX)-(-DI)
