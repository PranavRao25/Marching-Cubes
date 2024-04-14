# from noise import OpenSimplex
# noise = OpenSimplex()

cols,rows = 0,0
rez = 20
incr = 0.1 
field = []

def setup():
    fullScreen()
    cols,rows = 1+ width/rez,1+height/rez
    
    xoff,yoff = 0,0
    for i in range(cols):
        # xoff += 0.1
        # yoff = 0
        s = []
        for j in range(rows):
            # s.append(noise.noise_2d(xoff,yoff))
            s.append(floor(random(2)))
            # yoff += 0.1
        field.append(s)
    
def draw():
    background(127)
    cols,rows = 1+width/rez,1+height/rez
    
    # xoff,yoff = 0,
    # for i in range(cols):
    #     xoff += 0.1
    #     yoff = 0
    #     s = []
    #     for j in range(rows):
    #         # s.append(noise.noise_2d(xoff,yoff))
    #         s.append(floor(random(2)))
    #         yoff += 0.1
    #     field.append(s)
        
    for i in range(cols):
        for j in range(rows):
            stroke(field[i][j]*255)
            strokeWeight(rez*0.4);
            point(i*rez,j*rez)
    
    for i in range(cols-1):
        for j in range(rows-1):
            x,y = i*rez,j*rez
            
            # midpoint method
            a = PVector((x + rez/2),y)
            b = PVector((x + rez),(y + rez/2))
            c = PVector((x + rez/2),(y + rez))
            d = PVector(x,(y + rez/2))
            state = getState(ceil(field[i][j]),ceil(field[i][j+1]),ceil(field[i+1][j]),ceil(field[i+1][j+1]))
            
            stroke(255)
            strokeWeight(1)
            
            if(state==1):
                lineMid(c,b)
            elif(state==2):
                lineMid(b,a)
            elif(state==3):
                lineMid(a,c)
            elif(state==4):
                lineMid(d,c)
            elif(state==5):
                lineMid(b,d)
            elif(state==6):
                lineMid(d,c)
                lineMid(a,b)
            elif(state==7):
                lineMid(a,d)
            elif(state==8):
                lineMid(a,d)
            elif(state==9):
                lineMid(a,d)
                lineMid(b,c)
            elif(state==10):
                lineMid(b,d)
            elif(state==11):
                lineMid(d,c)
            elif(state==12):
                lineMid(a,c)
            elif(state==13):
                lineMid(b,a)
            elif(state==14):
                lineMid(c,b)
            else:
                continue
            
def lineMid(v1,v2):
    line(v1.x,v1.y,v2.x,v2.y)
    
getState = lambda a,b,c,d: a*8+b*4+c*2+d*1
                            
