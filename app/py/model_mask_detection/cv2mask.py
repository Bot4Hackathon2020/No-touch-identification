import cv2
from train import Models
from network import Network_simple_cnn
from PIL import Image
from torchvision import transforms
import time


def run():
    network = Network_simple_cnn()
    mymodel = Models(network, None, None, None)

    #path必须是绝对地址
    #path = "D:/QQ文件/Models/No-touch-identification/app/py/model_mask_detection/"

    mymodel.model_load("py/model_mask_detection/simple-CNN.pkl")

    left_eye_detector = cv2.CascadeClassifier("py/model_mask_detection/haarcascade_righteye_2splits.xml")
    cap = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_SIMPLEX
    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    preprocess = transforms.Compose([transforms.Resize(
        256), transforms.CenterCrop(224), transforms.ToTensor(), normalize])

    LIMIT = 30
    TIME = 10
    cnt = 0
    startTime = time.time()
    localtime = str(time.time())

    while cap.isOpened():
        flag, frame = cap.read()

        if flag == False:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        #print(gray)
        face_zone = left_eye_detector.detectMultiScale(gray)
        # print(np.array(face_zone))

        if len(face_zone) != 0:

            for face in [face_zone[0]]:
                left = face[0]
                top = face[1]
                h = face[2]
                cv2.rectangle(frame, (left - int(1.5 * h), top - int(1.5 * h)),
                              (left + int(3 * h), top + int(3 * h)), (0, 255, 0), 2)
                img1 = cv2.resize(
                    frame[max(top - int(1.5 * h), 0):top + 3 * h, max(left - int(1.5 * h), 0):left + 3 * h],
                    dsize=(256, 256))
                img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
                img1 = preprocess(Image.fromarray(img1))
                img1 = img1.unsqueeze(0)

                prediction = mymodel.network(img1)

                if prediction[0][0] >= 0.5:
                    result = "mask"
                    cv2.putText(frame, result, (left - int(1.5 * h), top - int(1.5 * h)), font,
                                2, (0, 255, 0), 2, cv2.LINE_AA)
                    cnt += 1
                    if cnt > LIMIT:
                        print("have mask")
                        cv2.imwrite("./pics" + localtime + ".jpg", frame)
                        return "no mask"
                else:
                    result = "nomask"
                    cv2.putText(frame, result, (left - int(1.5 * h), top - int(1.5 * h)), font,
                                2, (0, 0, 255), 2, cv2.LINE_AA)
        endTime = time.time()
        if endTime - startTime > TIME:
            print("no mask")
            cv2.imwrite("./pics/" + localtime + ".jpg", frame)
            return "no mask"

        # print(face_zone)

        cv2.imshow("mask", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    run()
