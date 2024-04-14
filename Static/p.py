import skimage

im = skimage.io.imread("army.jpg",as_gray=True)
for i in range(im.shape[0]):
    s = ""
    for j in range(im.shape[1]):
        s += f"{im[i][j]} "
    print(s)
