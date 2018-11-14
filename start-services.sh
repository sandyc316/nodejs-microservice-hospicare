#!/bin/bash

docker-compose -f docker-compose.yml up -d db rabbit_mq

# Wait 10 seconds to allow postgres and rabbit to start
sleep 10

docker-compose -f docker-compose.yml up patient_app doctor_app appointment_app appointment_home_app report_app

