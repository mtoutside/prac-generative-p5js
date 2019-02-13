final int N = 256;
final int iter = 10;
void IX(int x, int y) {
  return x + y * N;
}

class Fluid {
  int size;
  float dt;
  float diff;
  float visc;

  float[] s;
  float[] density;

  float[] Vx;
  float[] Vy;

  float[] Vx0;
  float[] Vy0;

  Fluid(float dt, float diffusion, float viscosity) {
    
    this.size = size;
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;
    
    this.s = new float[N * N];
    this.density = new float[N * N];
    
    this.Vx = new float[N * N];
    this.Vy = new float[N * N];
    
    this.Vx0 = new float[N * N];
    this.Vy0 = new float[N * N];
  }

  void addDensity(int x, int y, float amount) {
    int index = IX(x, y);
    this.density[index] += amount;
  }

  void addVelocity(int x, int y, float amountX, float amountY) {
    int index = IX(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }
}

void diffuse (int b, float[] x, float[] x0, float diff, float dt, int iter, int N)
{
    float a = dt * diff * (N - 2) * (N - 2);
    lin_solve(b, x, x0, a, 1 + 6 * a, iter, N);
}

void lin_solve(int b, float[] x, float[] x0, float a, float c) {
  float cRecip = 1.0 / c;
  for (int k = 0; k < iter; k++) {
    for (int j = 1; j < N - 1; j++) {
      for (int i = 1; i < N - 1; i++) {
        x[IX(i, j)] =
          (x0[IX(i, j)]
           + a*(    x[IX(i+1, j)]
             +x[IX(i-1, j)]
             +x[IX(i  , j+1)]
             +x[IX(i  , j-1)]
             )) * cRecip;
      }
    }
    set_bnd(b, x, N);
  }
}
