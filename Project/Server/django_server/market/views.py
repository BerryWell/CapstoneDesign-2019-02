from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the poee index.")

#로그인 목록 테이블 : 유저 id, 세션 id, 로그인 ip
#yarn dev : 프론트 + api서버를 띄움
#yarn:디펜던시 설치

#node js yarn 깔기
#node mockup api 서버는 껐다켜야함