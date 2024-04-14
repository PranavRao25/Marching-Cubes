cols,rows = 0,0
rez = 20
field = []
grid = []

def setup():
    fullScreen()
    
    cols,rows = 1+ width/rez,1+height/rez
    
    # with open("h.txt","r") as file:
    #     lines = file.readlines()
    #     for i in lines:
    #         s = [float(j) for j in i.split()]
    #         grid.append(s)

    for __ in range(cols):
        grid.append([random(2) for _ in range(rows)])
        
    for i in range(cols):
        field.append([floor(grid[i][j]) for j in range(rows)])
    
def draw():
    background(127)
    cols,rows = 1+width/rez,1+height/rez
        
    for i in range(cols):
        for j in range(rows):
            stroke(field[i][j]*255)
            strokeWeight(rez*0.4);
            point(i*rez,j*rez)
    
    for i in range(cols-1):
        for j in range(rows-1):
            # midpoint method
            # a,b,c,d = midPoint(i*rez,j*rez)
            
            # interPol method
            a,b,c,d = interPol(i,j)
            
            stroke(255)
            strokeWeight(1)
            state = getState([field[i][j],field[i][j+1],field[i+1][j],field[i+1][j+1]])
                       
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
    
getState = lambda l: sum([l[i]*(2**(len(l)-i-1)) for i in range(len(l))])

def midPoint(x,y):
    a = PVector((x + rez/2),y)
    b = PVector((x + rez),(y + rez/2))
    c = PVector((x + rez/2),(y + rez))
    d = PVector(x,(y + rez/2))
    
    return (a,b,c,d)

def interPol(i,j):
    m1 = grid[i][j]/(grid[i][j+1]+1)
    m2 = grid[i][j+1]/(grid[i+1][j+1]+1)
    m3 = grid[i+1][j]/(grid[i+1][j+1]+1)
    m4 = grid[i][j]/(grid[i+1][j]+1)
    
    a = PVector(i*rez,(j + m1)*rez)
    b = PVector((i + m2)*rez,(j + 1)*rez)
    c = PVector((i + 1)*rez,(j + m3)*rez)
    d = PVector((i + m4)*rez,j*rez)
    
    return a,b,c,d
