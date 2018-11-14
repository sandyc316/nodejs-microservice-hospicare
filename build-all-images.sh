#!/bin/bash

cwd=$(pwd)

echo "----------- Building Patient services image ------------------"
cd $cwd/patient-services
docker build -t patient_nodeapi .

echo "----------- Building Report services image ------------------"
cd $cwd/report-services
docker build -t report_nodeapi .

echo "----------- Building Appointment services image ------------------"
cd $cwd/appointment-services
docker build -t appointment_nodeapi .

echo "----------- Building Doctor services image ------------------"
cd $cwd/doctor-services
docker build -t doctor_nodeapi .

echo "----------- Building Appointment at home services image ------------------"
cd $cwd/appointment-at-home-services
docker build -t appt_at_home_nodeapi .


