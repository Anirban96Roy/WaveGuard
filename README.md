# Flood monitoring and rescue system (WaveGuard)

## git clone https://github.com/AritraLikhan/WaveGuard.git

## install python 3.10.0 into your pc and make sure it is globally accessible (add the binary file path to environment variable)

## go to link : https://mega.nz/file/eBcl3DTD#4dLU3kayO81PINeEkDanAdOPzUAh5iHFcU0fAUi9q4w 

## download the myenv.zip file, extract it and save it in the root directory of the project (WaveGuard)

## open terminals and run the following:

1. (in the WaveGuard) npm install
2. (in the client) npm install
3. (in the client) npm install react-leaflet@4.x.x
4. (in the WaveGuard) myenv/Scripts/activate
5. (in the WaveGuard) python app2.py
6. (in the WaveGuard) npm run dev

## make sure the mongodb compass is running and database is connected      

## In case port doesn't allow to run the project     
Run the following commands in terminal:    
```
netstat -ano | findstr :<port-number>
```
Find the PID being listened and kill it by running:
```
taskkill /PID <PID> /F
```
For example, for port 8081, run :
```
netstat -ano | findstr :8081
```
Check for output like this:
  TCP    0.0.0.0:8081           0.0.0.0:0              LISTENING       3364

Now to kill the process (PID) "3364" occupying port 8081, run:
```
taskkill /PID 3364 /F
```
!!!CAUTION     
If you think the port might be executing some vital process that should not be preempted, try using a different port for frontend or backend

  
