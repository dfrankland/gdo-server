import secplus
import sys

fixed_code = int(sys.argv[1])
rolling = int(sys.argv[2])

code = secplus.encode_v2_manchester(rolling, fixed_code);
code = ''.join([str(x) for x in code])
print(code);