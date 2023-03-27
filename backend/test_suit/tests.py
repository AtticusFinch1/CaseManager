from django.test import TestCase

def func(num, arr):
    varOne=1
    arr[0]=0

varOne=[1,2,3]
varTwo=3

print(func(varTwo, varOne))
print(varTwo, varOne[0])
