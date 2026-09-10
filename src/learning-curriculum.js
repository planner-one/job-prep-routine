// 인프런 공개 강의 페이지의 목차·시간. 조회일과 출처는 강의별로 보존합니다.
export const COURSE_CURRICULA = {
  "20": {
    "title": "금융 인프라를 운영하는 Toss 개발자의 Kubernetes",
    "url": "https://www.inflearn.com/course/kubernetes-for-toss",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-05-02 13:54:22",
    "totalSeconds": 27845,
    "totalUnits": 29,
    "sections": [
      {
        "id": "408111",
        "title": "강의 소개",
        "units": [
          {
            "id": "408112",
            "title": "강의 소개",
            "seconds": 320,
            "video": true
          },
          {
            "id": "410227",
            "title": "Source Code",
            "seconds": 0,
            "video": false
          },
          {
            "id": "416707",
            "title": "자주 사용되는 대표적인 쿠버네티스 명령어들",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "409158",
        "title": "Part1. Kubernetes 개요 및 Docker와의 호환성",
        "units": [
          {
            "id": "409159",
            "title": "강의 환경 검증과 Docker 기본 개념 및 Kubernetes와의 연관 관계",
            "seconds": 1181,
            "video": true
          },
          {
            "id": "409160",
            "title": "Docker Desktop를 활용하여 버튼 하나로 구성하는 Kubernetes 환경",
            "seconds": 524,
            "video": true
          },
          {
            "id": "409161",
            "title": "Kubernetes는 무엇이고, 왜 Docker만으로는 부족할까",
            "seconds": 1357,
            "video": true
          },
          {
            "id": "451407",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "409165",
        "title": "Part1. Kubernetes의 근간이 되는 최소 및 핵심 지식",
        "units": [
          {
            "id": "409162",
            "title": "Kubernetes의 기본문법을 위한 .YAML",
            "seconds": 558,
            "video": true
          },
          {
            "id": "409163",
            "title": "Kubernetes의 핵심이자 가장 기본적인 오브젝트 Pod",
            "seconds": 1353,
            "video": true
          },
          {
            "id": "409164",
            "title": "Kubernetes의 핵심 Self-healing을 위한 Deployment",
            "seconds": 1625,
            "video": true
          },
          {
            "id": "410220",
            "title": "Kubernetes의 도메인 접근을 위한 Service 핵심 오브젝트",
            "seconds": 1199,
            "video": true
          },
          {
            "id": "410221",
            "title": "Kubernetes Production Level처럼 서버 직접 구동하며 인프라 구성하기",
            "seconds": 1130,
            "video": true
          },
          {
            "id": "451408",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410219",
        "title": "Part2. Kubernetes를 통한 서비스 관리 패턴",
        "units": [
          {
            "id": "410222",
            "title": "NameSpace를 활용한 Container Object Grouping",
            "seconds": 881,
            "video": true
          },
          {
            "id": "410223",
            "title": "Application 환경 변수 설정을 위한 ConfigMap",
            "seconds": 807,
            "video": true
          },
          {
            "id": "411212",
            "title": "Pod간의 데이터 공유 및 영속성을 위한 PV와 PVC 개념 및 실습",
            "seconds": 1177,
            "video": true
          },
          {
            "id": "411213",
            "title": "Application의 Life Cycle 및 상태 검증을 위한 Probe",
            "seconds": 1238,
            "video": true
          },
          {
            "id": "411214",
            "title": "장애 전파를 방지하기 위한 Resource를 활용한 CPU와 Memory 할당 및 제한 기법",
            "seconds": 901,
            "video": true
          },
          {
            "id": "451411",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "411211",
        "title": "Part3. Kubernetes 고급 패턴과 Public Repository를 통한 배포 자동화 실습",
        "units": [
          {
            "id": "411215",
            "title": "하나의 도메인에서 트래픽 라우팅을 위한 Ingress & Ingress Controller",
            "seconds": 701,
            "video": true
          },
          {
            "id": "413044",
            "title": "Helm을 활용한 Kubernetes Package Managing",
            "seconds": 1034,
            "video": true
          },
          {
            "id": "413045",
            "title": "Prometheus와 Grafana를 사용한 Cluster 모니터링",
            "seconds": 992,
            "video": true
          },
          {
            "id": "413046",
            "title": "Gitops와 ArgoCD를 활용한 CI/CD 배포 자동화",
            "seconds": 1380,
            "video": true
          },
          {
            "id": "413047",
            "title": "신규 버전 배포를 위한 인프라 배포 전략 가이드",
            "seconds": 1123,
            "video": true
          },
          {
            "id": "413463",
            "title": "Github Public Repository를 활용한 ArgoCD 배포 실습",
            "seconds": 1410,
            "video": true
          },
          {
            "id": "451409",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "441391",
        "title": "Part4. Istio를 활용한 Kubernetes 확장 패턴",
        "units": [
          {
            "id": "441398",
            "title": "Istio실습을 위한 manifests 설정 파일 정리본",
            "seconds": 0,
            "video": false
          },
          {
            "id": "441392",
            "title": "서비스 메시 개념과 사이드카 자동 주입 패턴의 원리와 실습",
            "seconds": 1741,
            "video": true
          },
          {
            "id": "441393",
            "title": "Gateway, VirtualService, DestinationRule 개념과 실습 환경 구성",
            "seconds": 987,
            "video": true
          },
          {
            "id": "441394",
            "title": "Ingress Gateway를 활용한 외부 노출 및 카나리 실습",
            "seconds": 1129,
            "video": true
          },
          {
            "id": "441395",
            "title": "헤더 기반 라우팅 분배 규칙",
            "seconds": 542,
            "video": true
          },
          {
            "id": "441396",
            "title": "카오스 엔지니어링 패턴을 사용한 장애 패턴 실습",
            "seconds": 1214,
            "video": true
          },
          {
            "id": "441397",
            "title": "장애 회복성 패턴을 위한 인프라 계층의 서킷 브레이커 패턴",
            "seconds": 1341,
            "video": true
          },
          {
            "id": "451410",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "36": {
    "title": "eks를 활용한 spring 운영서버 배포(feat. devops의 모든것)",
    "url": "https://www.inflearn.com/course/eks-%EB%8D%B0%EB%B8%8C%EC%98%B5%EC%8A%A4%EC%A0%84%EB%B0%98",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-06-14 22:50:07",
    "totalSeconds": 59567,
    "totalUnits": 40,
    "sections": [
      {
        "id": "260747",
        "title": "spring 빌드 및 docker 기초",
        "units": [
          {
            "id": "260748",
            "title": "수업개요",
            "seconds": 1394,
            "video": true
          },
          {
            "id": "286438",
            "title": "docker 개요",
            "seconds": 1255,
            "video": true
          },
          {
            "id": "286439",
            "title": "spring 빌드환경 이해",
            "seconds": 1263,
            "video": true
          },
          {
            "id": "286440",
            "title": "docker 이미지 빌드",
            "seconds": 1279,
            "video": true
          },
          {
            "id": "286635",
            "title": "docker와  docker-compose 실행",
            "seconds": 2056,
            "video": true
          },
          {
            "id": "315973",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "284638",
        "title": "쿠버네티스 개요 및 실습환경세팅",
        "units": [
          {
            "id": "286857",
            "title": "쿠버네티스 개요",
            "seconds": 1524,
            "video": true
          },
          {
            "id": "288797",
            "title": "쿠버네티스 주요 구성 요소",
            "seconds": 2904,
            "video": true
          }
        ]
      },
      {
        "id": "284639",
        "title": "aws 핵심 요소",
        "units": [
          {
            "id": "289918",
            "title": "AWS핵심요소-EC2",
            "seconds": 1602,
            "video": true
          },
          {
            "id": "289919",
            "title": "AWS핵심요소-VPC,RDS",
            "seconds": 1201,
            "video": true
          },
          {
            "id": "289920",
            "title": "AWS핵심요소-iam등",
            "seconds": 1578,
            "video": true
          },
          {
            "id": "315975",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "289917",
        "title": "쿠버네티스 실습환경세팅",
        "units": [
          {
            "id": "290005",
            "title": "환경세팅 개요",
            "seconds": 1015,
            "video": true
          },
          {
            "id": "289921",
            "title": "도메인 구매 및 route53설정",
            "seconds": 831,
            "video": true
          },
          {
            "id": "289922",
            "title": "클러스터 생성 및 aws cli, kubectl 세팅",
            "seconds": 1319,
            "video": true
          },
          {
            "id": "315974",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "289924",
        "title": "쿠버네티스 주요 요소 실습",
        "units": [
          {
            "id": "290341",
            "title": "namespace",
            "seconds": 526,
            "video": true
          },
          {
            "id": "290344",
            "title": "Pod",
            "seconds": 2357,
            "video": true
          },
          {
            "id": "290392",
            "title": "Service",
            "seconds": 1544,
            "video": true
          },
          {
            "id": "291346",
            "title": "Replicaset",
            "seconds": 1322,
            "video": true
          },
          {
            "id": "291347",
            "title": "Deployment",
            "seconds": 1412,
            "video": true
          },
          {
            "id": "291348",
            "title": "Ingress-이론",
            "seconds": 1098,
            "video": true
          },
          {
            "id": "291388",
            "title": "Ingress-실습",
            "seconds": 1754,
            "video": true
          },
          {
            "id": "315977",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "284640",
        "title": "eks를 활용한 spring 서버 배포",
        "units": [
          {
            "id": "301179",
            "title": "아키텍처개요",
            "seconds": 698,
            "video": true
          },
          {
            "id": "301180",
            "title": "인프라자원생성",
            "seconds": 1144,
            "video": true
          },
          {
            "id": "301582",
            "title": "이미지 빌드/push",
            "seconds": 1079,
            "video": true
          },
          {
            "id": "301583",
            "title": "쿠버네티스 자원 생성",
            "seconds": 2096,
            "video": true
          },
          {
            "id": "301671",
            "title": "https통신을 위한 인증서 작업",
            "seconds": 2069,
            "video": true
          },
          {
            "id": "301732",
            "title": "github actions와 CI/CD 자동화",
            "seconds": 2370,
            "video": true
          },
          {
            "id": "315976",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "284641",
        "title": "오토스케일, argocd, 프로메테우스/그라파나",
        "units": [
          {
            "id": "313716",
            "title": "오토스케일-pod자동확장",
            "seconds": 1771,
            "video": true
          },
          {
            "id": "313717",
            "title": "오토스케일-인스턴스 자동확장(개요)",
            "seconds": 619,
            "video": true
          },
          {
            "id": "313718",
            "title": "오토스케일-인스턴스 자동확장(iam설정)",
            "seconds": 1272,
            "video": true
          },
          {
            "id": "313719",
            "title": "오토스케일-인스턴스 자동확장(autoscaler 생성 및 테스트)",
            "seconds": 1265,
            "video": true
          },
          {
            "id": "313720",
            "title": "argocd-pod생성 및 테스트",
            "seconds": 1843,
            "video": true
          },
          {
            "id": "313721",
            "title": "argocd-UI대시보드",
            "seconds": 2148,
            "video": true
          },
          {
            "id": "313722",
            "title": "프로메테우스,그라파나-개요",
            "seconds": 2304,
            "video": true
          },
          {
            "id": "313723",
            "title": "프로메테우스,그라파나-대시보드",
            "seconds": 615,
            "video": true
          },
          {
            "id": "315972",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "288798",
        "title": "eks를 활용한 spring msa 서버 배포",
        "units": [
          {
            "id": "314782",
            "title": "개요",
            "seconds": 1888,
            "video": true
          },
          {
            "id": "314783",
            "title": "로컬 서버 환경구성",
            "seconds": 1877,
            "video": true
          },
          {
            "id": "314784",
            "title": "로컬 서버 실행",
            "seconds": 1094,
            "video": true
          },
          {
            "id": "314785",
            "title": "EKS 배포 개요",
            "seconds": 563,
            "video": true
          },
          {
            "id": "314934",
            "title": "api-gateway 배포",
            "seconds": 1989,
            "video": true
          },
          {
            "id": "314935",
            "title": "각 서비스 모듈 배포 및 마무리",
            "seconds": 1629,
            "video": true
          },
          {
            "id": "315978",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "41": {
    "title": "3시간에 끝내는 디지털 마케팅의 모든 것",
    "url": "https://www.inflearn.com/course/3%EC%8B%9C%EA%B0%84%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-%EB%94%94%EC%A7%80%ED%84%B8%EB%A7%88%EC%BC%80%ED%8C%85-%EB%AA%A8%EB%93%A0%EA%B2%83",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:52:03",
    "totalSeconds": 11366,
    "totalUnits": 15,
    "sections": [
      {
        "id": "43962",
        "title": "디지털 마케팅 기초",
        "units": [
          {
            "id": "43961",
            "title": "오리엔테이션",
            "seconds": 324,
            "video": true
          },
          {
            "id": "43965",
            "title": "디지털 마케팅, 뭔데 그렇게 인기가 많아 ?",
            "seconds": 570,
            "video": true
          },
          {
            "id": "43966",
            "title": "데이터 기반의 디지털 마케팅",
            "seconds": 222,
            "video": true
          },
          {
            "id": "43968",
            "title": "디지털 마케팅의 2가지 큰 흐름",
            "seconds": 543,
            "video": true
          },
          {
            "id": "298153",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "43967",
        "title": "컨텐츠 마케팅과 퍼포먼스 마케팅",
        "units": [
          {
            "id": "43969",
            "title": "컨텐츠 마케팅의 정의",
            "seconds": 1073,
            "video": true
          },
          {
            "id": "43970",
            "title": "컨텐츠 마케터가 자주 사용하는 용어",
            "seconds": 868,
            "video": true
          },
          {
            "id": "43971",
            "title": "퍼포먼스 마케팅의 정의",
            "seconds": 1041,
            "video": true
          },
          {
            "id": "43972",
            "title": "퍼포먼스 마케터가 자주 사용하는 용어",
            "seconds": 793,
            "video": true
          },
          {
            "id": "43974",
            "title": "쉬어가는 퀴즈 타임",
            "seconds": 74,
            "video": true
          },
          {
            "id": "298873",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "43973",
        "title": "컨텐츠와 퍼포먼스, 더 잘하기 위해서는 ?",
        "units": [
          {
            "id": "43975",
            "title": "컨텐츠와 퍼포먼스 더 잘하기 위해서는 ?",
            "seconds": 293,
            "video": true
          },
          {
            "id": "43976",
            "title": "데이터 기반의 광고 최적화",
            "seconds": 753,
            "video": true
          },
          {
            "id": "43977",
            "title": "데이터 기반의 플랫폼 최적화",
            "seconds": 1048,
            "video": true
          },
          {
            "id": "299732",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "43978",
        "title": "구글 애널리틱스 맛보기",
        "units": [
          {
            "id": "43979",
            "title": "구글 애널리틱스 시작하기",
            "seconds": 688,
            "video": true
          },
          {
            "id": "43980",
            "title": "구글 애널리틱스 시작하기 2",
            "seconds": 1977,
            "video": true
          }
        ]
      },
      {
        "id": "43981",
        "title": "강의를 마치며",
        "units": [
          {
            "id": "43982",
            "title": "디지털 마케터, 어떤 스킬이 어필되나요 ?",
            "seconds": 1099,
            "video": true
          }
        ]
      }
    ]
  },
  "16": {
    "title": "네이버 면접관이 알려주는 1,000,000++ TPS를 위한 NGINX",
    "url": "https://www.inflearn.com/course/nginx-used-to-proces",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-08 12:24:48",
    "totalSeconds": 17362,
    "totalUnits": 17,
    "sections": [
      {
        "id": "403521",
        "title": "강의 소개",
        "units": [
          {
            "id": "403522",
            "title": "강의 소개",
            "seconds": 283,
            "video": true
          }
        ]
      },
      {
        "id": "406492",
        "title": "레거시 시스템 vs NGINX 비교 & 실습 환경 구성",
        "units": [
          {
            "id": "406483",
            "title": "Apache의 단점을 해결한 NGINX Core Concept",
            "seconds": 1305,
            "video": true
          },
          {
            "id": "406484",
            "title": "NGINX 설치 및 환경 구성 [ Feat. 무중단 배포를 위한 명령어 ]",
            "seconds": 1265,
            "video": true
          }
        ]
      },
      {
        "id": "406482",
        "title": "그대로 복사해서 사용하시면 됩니다. NGINX 기본 사용법",
        "units": [
          {
            "id": "406485",
            "title": "부모 자식 관계를 기반으로 하는 NGINX의 Context Block",
            "seconds": 803,
            "video": true
          },
          {
            "id": "406486",
            "title": "NGINX 표준 문법 특수한 상속 기법과 덮어쓰기 방식",
            "seconds": 709,
            "video": true
          },
          {
            "id": "406487",
            "title": "Include와 확장성을 고려하여 추상화 개념을 도입한 NGINX 모듈화 패턴",
            "seconds": 785,
            "video": true
          },
          {
            "id": "406488",
            "title": "NGINX의 처리량 관점에서의 Process Model Setting",
            "seconds": 895,
            "video": true
          },
          {
            "id": "406489",
            "title": "성능을 최적화하는 방법과 설정하기 위한 기본 NGINX Template 포멧",
            "seconds": 918,
            "video": true
          },
          {
            "id": "406490",
            "title": "네트워크 전송 관점의 최적화를 위한 Compression Settings Template",
            "seconds": 775,
            "video": true
          },
          {
            "id": "424693",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406491",
        "title": "Edge Case를 구현하기 위한 NGINX만의 꼼수 패턴",
        "units": [
          {
            "id": "406841",
            "title": "정적 파일 서빙 Path Matching 기법  root와 alias",
            "seconds": 549,
            "video": true
          },
          {
            "id": "406842",
            "title": "여러 도메인 호스팅을 위한 Virtual Host ( Server Block ) Setting",
            "seconds": 1153,
            "video": true
          },
          {
            "id": "406843",
            "title": "Redirection과 Rewrite Directive",
            "seconds": 1308,
            "video": true
          },
          {
            "id": "424692",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406840",
        "title": "Reverse Proxy 관점에서의 NGINX 사용법",
        "units": [
          {
            "id": "406844",
            "title": "HTTP1.0/HTTP1.1을 기반으로 하는 Dynamic Reverse Proxy",
            "seconds": 1540,
            "video": true
          },
          {
            "id": "406845",
            "title": "WebSocket을 기반으로 하는 Dynamic Reverse Proxy 및 서버 기능 테스트",
            "seconds": 749,
            "video": true
          },
          {
            "id": "406991",
            "title": "Load Balancing Using NGINX 그리고 5가지 알고리즘",
            "seconds": 1620,
            "video": true
          },
          {
            "id": "406992",
            "title": "NGINX에서의 성능 최적화의 모든것 [ Feat. Performance Optimization ]",
            "seconds": 865,
            "video": true
          },
          {
            "id": "406997",
            "title": "HTTPS SSL/TLS CA 인증서 적용 및 HTTP/2 Protocol 구현하기",
            "seconds": 1840,
            "video": true
          },
          {
            "id": "424694",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "6": {
    "title": "[백엔드/예외처리 시나리오/집계 최적화] 백엔드 포트폴리오와 실무 이력 강화 전략. 올인원 PART1",
    "url": "https://www.inflearn.com/course/%EB%B0%B1%EC%97%94%EB%93%9C-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%8B%A4%EB%AC%B4%EC%9D%B4%EB%A0%A5%EA%B0%95%ED%99%94-%EC%98%AC%EC%9D%B8%EC%9B%90-part1",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:52:09",
    "totalSeconds": 9508,
    "totalUnits": 21,
    "sections": [
      {
        "id": "257148",
        "title": "강의 시작",
        "units": [
          {
            "id": "257149",
            "title": "강의 소개 영상(강의 구매전에 미리 참고해주세요!)",
            "seconds": 338,
            "video": true
          },
          {
            "id": "257499",
            "title": "강의 자료",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "246989",
        "title": "결제 연동",
        "units": [
          {
            "id": "246990",
            "title": "프로젝트 설명",
            "seconds": 211,
            "video": true
          },
          {
            "id": "247289",
            "title": "결제연동을위한사전준비",
            "seconds": 225,
            "video": true
          },
          {
            "id": "247433",
            "title": "결제모듈추가",
            "seconds": 664,
            "video": true
          },
          {
            "id": "247438",
            "title": "결제호출후데이터저장",
            "seconds": 831,
            "video": true
          },
          {
            "id": "248405",
            "title": "결제 취소 개발",
            "seconds": 1145,
            "video": true
          },
          {
            "id": "249508",
            "title": "외부 API 사용시 고려할 부분(이론)",
            "seconds": 268,
            "video": true
          },
          {
            "id": "254372",
            "title": "외부 API 사용시 고려할 부분(코드)",
            "seconds": 393,
            "video": true
          },
          {
            "id": "249509",
            "title": "기술 면접 대비",
            "seconds": 278,
            "video": true
          },
          {
            "id": "299791",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "247290",
        "title": "결제 내역 집계",
        "units": [
          {
            "id": "248406",
            "title": "더미 데이터 추가하기.",
            "seconds": 285,
            "video": true
          },
          {
            "id": "248407",
            "title": "정산 집계를 위한 스케줄링 추가",
            "seconds": 587,
            "video": true
          },
          {
            "id": "248408",
            "title": "스케줄링 활용시 고려할 포인트 개선하기",
            "seconds": 1039,
            "video": true
          },
          {
            "id": "249510",
            "title": "기술 면접 대비",
            "seconds": 339,
            "video": true
          },
          {
            "id": "296493",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "249505",
        "title": "집계 성능 개선하기",
        "units": [
          {
            "id": "249506",
            "title": "집계 성능 개선을 위한 시도 V1",
            "seconds": 335,
            "video": true
          },
          {
            "id": "250203",
            "title": "고민해볼 포인트",
            "seconds": 591,
            "video": true
          },
          {
            "id": "249507",
            "title": "bulk insert 방식을 활용한 개선 시도 V2",
            "seconds": 496,
            "video": true
          },
          {
            "id": "259648",
            "title": "대량의 쿼리가 중간에 실패한다면?",
            "seconds": 615,
            "video": true
          },
          {
            "id": "255895",
            "title": "기술 면접 대비",
            "seconds": 356,
            "video": true
          },
          {
            "id": "298330",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "251968",
        "title": "NEXT",
        "units": [
          {
            "id": "257745",
            "title": "이력/포트폴리오 완성 예시",
            "seconds": 391,
            "video": true
          },
          {
            "id": "257744",
            "title": "NEXT PART2 소개",
            "seconds": 121,
            "video": true
          }
        ]
      }
    ]
  },
  "7": {
    "title": "마이크로서비스 디자인 패턴 완벽 가이드",
    "url": "https://www.inflearn.com/course/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-msa",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-08-01 00:13:32",
    "totalSeconds": 95910,
    "totalUnits": 118,
    "sections": [
      {
        "id": "199100",
        "title": "Microservice Architecture Fundamentals",
        "units": [
          {
            "id": "286094",
            "title": "강의소개",
            "seconds": 125,
            "video": true
          },
          {
            "id": "312046",
            "title": "이전 강의와의 비교 (vs Spring Cloud로 개발하는 마이크로서비스 애플리케이션)",
            "seconds": 353,
            "video": true
          },
          {
            "id": "301064",
            "title": "강의 실습 코드 안내",
            "seconds": 260,
            "video": true
          },
          {
            "id": "286095",
            "title": "섹션소개",
            "seconds": 58,
            "video": true
          },
          {
            "id": "286096",
            "title": "Monolithic Architecture 소개",
            "seconds": 1593,
            "video": true
          },
          {
            "id": "286097",
            "title": "Monolithic Architecture의 방법론과 패턴 소개",
            "seconds": 1050,
            "video": true
          },
          {
            "id": "286098",
            "title": "Microservice Architecture 방법론과 패턴 소개",
            "seconds": 1642,
            "video": true
          },
          {
            "id": "286099",
            "title": "Architecture의 문제점 해결을 위한 패턴 소개",
            "seconds": 1603,
            "video": true
          },
          {
            "id": "307615",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199110",
        "title": "Monolithic Architecture",
        "units": [
          {
            "id": "286766",
            "title": "섹션소개",
            "seconds": 114,
            "video": true
          },
          {
            "id": "286767",
            "title": "Monolithic Architecture 개요",
            "seconds": 980,
            "video": true
          },
          {
            "id": "286768",
            "title": "Monolithic Architecture  적용",
            "seconds": 730,
            "video": true
          },
          {
            "id": "286770",
            "title": "Modular Monolithic Architecture 소개",
            "seconds": 1020,
            "video": true
          },
          {
            "id": "307060",
            "title": "Clean Architecture 소개",
            "seconds": 705,
            "video": true
          },
          {
            "id": "307061",
            "title": "[실습 1] Clean Architecture 구현 에제",
            "seconds": 440,
            "video": true
          },
          {
            "id": "307620",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199111",
        "title": "Modular Monolithic Architecture",
        "units": [
          {
            "id": "286771",
            "title": "섹션소개",
            "seconds": 112,
            "video": true
          },
          {
            "id": "286772",
            "title": "Modular Monolithic Architecture 개요",
            "seconds": 1330,
            "video": true
          },
          {
            "id": "286774",
            "title": "Modular Monolithic Architecture 패턴",
            "seconds": 688,
            "video": true
          },
          {
            "id": "286775",
            "title": "Hexagonal Architecture",
            "seconds": 1230,
            "video": true
          },
          {
            "id": "290743",
            "title": "[실습 2] Monolithic Application (Eshop)",
            "seconds": 1662,
            "video": true
          },
          {
            "id": "307622",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199112",
        "title": "Microservice Architecture",
        "units": [
          {
            "id": "286777",
            "title": "섹션소개",
            "seconds": 116,
            "video": true
          },
          {
            "id": "286778",
            "title": "Microservice Architecture 개요",
            "seconds": 1039,
            "video": true
          },
          {
            "id": "286779",
            "title": "Microservice Architecture 장단점",
            "seconds": 666,
            "video": true
          },
          {
            "id": "286780",
            "title": "Microservice Architecture 적용",
            "seconds": 1329,
            "video": true
          },
          {
            "id": "307048",
            "title": "Quiz",
            "seconds": 309,
            "video": true
          },
          {
            "id": "307616",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199113",
        "title": "Decomposition Patterns",
        "units": [
          {
            "id": "286781",
            "title": "섹션소개",
            "seconds": 91,
            "video": true
          },
          {
            "id": "286782",
            "title": "Decomposition 개요",
            "seconds": 1786,
            "video": true
          },
          {
            "id": "286783",
            "title": "Practice: Service Decomposition",
            "seconds": 909,
            "video": true
          },
          {
            "id": "286784",
            "title": "서비스 분해시 고려사항",
            "seconds": 939,
            "video": true
          },
          {
            "id": "307049",
            "title": "[실습 3] E-commerce 서비스 분해",
            "seconds": 308,
            "video": true
          },
          {
            "id": "307050",
            "title": "Quiz",
            "seconds": 379,
            "video": true
          },
          {
            "id": "307623",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199117",
        "title": "Service Communications Patterns",
        "units": [
          {
            "id": "289758",
            "title": "섹션소개",
            "seconds": 62,
            "video": true
          },
          {
            "id": "289771",
            "title": "Microservice Architecture에서의 통신 방법",
            "seconds": 2037,
            "video": true
          },
          {
            "id": "289777",
            "title": "동기화 통신 방법",
            "seconds": 1102,
            "video": true
          },
          {
            "id": "289772",
            "title": "RESTful API 통신",
            "seconds": 2091,
            "video": true
          },
          {
            "id": "289773",
            "title": "GraphQL 통신",
            "seconds": 668,
            "video": true
          },
          {
            "id": "289774",
            "title": "gRPC 통신",
            "seconds": 550,
            "video": true
          },
          {
            "id": "289775",
            "title": "WebSocket 통신",
            "seconds": 531,
            "video": true
          },
          {
            "id": "289776",
            "title": "REST vs GraphQL vs gRPC 비교",
            "seconds": 412,
            "video": true
          },
          {
            "id": "290744",
            "title": "[실습 4] REST API 구현",
            "seconds": 2218,
            "video": true
          },
          {
            "id": "301059",
            "title": "[실습 5] gRPC 구현",
            "seconds": 1229,
            "video": true
          },
          {
            "id": "301060",
            "title": "[실습 6] GraphQL 구현",
            "seconds": 1319,
            "video": true
          },
          {
            "id": "307618",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199114",
        "title": "API Gateway Patterns",
        "units": [
          {
            "id": "289759",
            "title": "섹션소개",
            "seconds": 94,
            "video": true
          },
          {
            "id": "289999",
            "title": "API Gateway 패턴",
            "seconds": 1006,
            "video": true
          },
          {
            "id": "290000",
            "title": "BFF (Backend for Frontend) 패턴",
            "seconds": 251,
            "video": true
          },
          {
            "id": "290001",
            "title": "Aggregator / Discovery 패턴",
            "seconds": 1138,
            "video": true
          },
          {
            "id": "290745",
            "title": "[실습 7] Service Discovery + APIGateway 연동",
            "seconds": 1271,
            "video": true
          },
          {
            "id": "301374",
            "title": "[실습 8] Backend for Frontend (BFF) 구현",
            "seconds": 1978,
            "video": true
          },
          {
            "id": "307621",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199115",
        "title": "Asynchronous Communication Patterns",
        "units": [
          {
            "id": "289760",
            "title": "섹션소개",
            "seconds": 93,
            "video": true
          },
          {
            "id": "290007",
            "title": "비동기(Asynchronous) 통신에 대한 개요",
            "seconds": 955,
            "video": true
          },
          {
            "id": "290010",
            "title": "비동기 통신에서의 메세지 처리 방법",
            "seconds": 558,
            "video": true
          },
          {
            "id": "290011",
            "title": "Publish / Subscribe 패턴",
            "seconds": 611,
            "video": true
          },
          {
            "id": "290012",
            "title": "Kafka에서의 통신 방법",
            "seconds": 780,
            "video": true
          },
          {
            "id": "290013",
            "title": "RabbitMQ에서의 통신 방법",
            "seconds": 459,
            "video": true
          },
          {
            "id": "290746",
            "title": "[실습 9]  Message Broker 실행 및 메시지 발행",
            "seconds": 1336,
            "video": true
          },
          {
            "id": "301718",
            "title": "[실습 10] Kafka를 이용한 서비스간 비동기 처리",
            "seconds": 1604,
            "video": true
          },
          {
            "id": "307617",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199116",
        "title": "Data Management Patterns",
        "units": [
          {
            "id": "289761",
            "title": "섹션소개",
            "seconds": 111,
            "video": true
          },
          {
            "id": "290716",
            "title": "Polyglot Persistence",
            "seconds": 1381,
            "video": true
          },
          {
            "id": "290719",
            "title": "Database per service 패턴",
            "seconds": 1121,
            "video": true
          },
          {
            "id": "290720",
            "title": "RDB와 NoSQL",
            "seconds": 921,
            "video": true
          },
          {
            "id": "290721",
            "title": "CAP(Consistency, Availability, Partition Tolerance) 이론",
            "seconds": 616,
            "video": true
          },
          {
            "id": "290722",
            "title": "Data Partitioning",
            "seconds": 392,
            "video": true
          },
          {
            "id": "290723",
            "title": "Database Sharding 패턴",
            "seconds": 597,
            "video": true
          },
          {
            "id": "290747",
            "title": "[실습 11] 2개의 MariaDB를 이용한 Sharding 처리 ①",
            "seconds": 528,
            "video": true
          },
          {
            "id": "306268",
            "title": "[실습 12] 2개의 MariaDB를 이용한 Sharding 처리 ②",
            "seconds": 1352,
            "video": true
          },
          {
            "id": "307614",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "199118",
        "title": "CQRS Patterns",
        "units": [
          {
            "id": "289762",
            "title": "섹션소개",
            "seconds": 84,
            "video": true
          },
          {
            "id": "290724",
            "title": "Cross Service Queries",
            "seconds": 881,
            "video": true
          },
          {
            "id": "290725",
            "title": "CQRS 패턴",
            "seconds": 1210,
            "video": true
          },
          {
            "id": "290726",
            "title": "Event Sourcing 패턴",
            "seconds": 975,
            "video": true
          },
          {
            "id": "290748",
            "title": "[실습 13] CQRS + Event Sourcing 처리 ①",
            "seconds": 708,
            "video": true
          },
          {
            "id": "306269",
            "title": "[실습 14] CQRS + Event Sourcing 처리 ②",
            "seconds": 1610,
            "video": true
          },
          {
            "id": "307625",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283464",
        "title": "Distributed Transactions",
        "units": [
          {
            "id": "289763",
            "title": "섹션소개",
            "seconds": 81,
            "video": true
          },
          {
            "id": "289778",
            "title": "분산 트랜잭션 처리 방법",
            "seconds": 1194,
            "video": true
          },
          {
            "id": "289779",
            "title": "SAGA 패턴",
            "seconds": 1235,
            "video": true
          },
          {
            "id": "289780",
            "title": "Dual Write Problem + Outbox + CDC 패턴",
            "seconds": 1026,
            "video": true
          },
          {
            "id": "289782",
            "title": "Distributed Databases",
            "seconds": 413,
            "video": true
          },
          {
            "id": "290749",
            "title": "[실습 15] 보상 트랜잭션 (SAGA 패턴 작동 흐름) ①",
            "seconds": 887,
            "video": true
          },
          {
            "id": "307051",
            "title": "[실습 16] 보상 트랜잭션 (코드 실행) ②",
            "seconds": 1196,
            "video": true
          },
          {
            "id": "307052",
            "title": "[실습 17] 보상 트랜잭션 (코드 분석) ③",
            "seconds": 1262,
            "video": true
          },
          {
            "id": "307626",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283465",
        "title": "Event-Driven Architecture",
        "units": [
          {
            "id": "289764",
            "title": "섹션소개",
            "seconds": 60,
            "video": true
          },
          {
            "id": "290727",
            "title": "Event Driven Architecture 소개",
            "seconds": 991,
            "video": true
          },
          {
            "id": "290728",
            "title": "Event Driven Architecture 패턴",
            "seconds": 1158,
            "video": true
          },
          {
            "id": "290750",
            "title": "[실습 18] Event Driven Architecture ①",
            "seconds": 670,
            "video": true
          },
          {
            "id": "307053",
            "title": "[실습 19] Event Driven Architecture ②",
            "seconds": 977,
            "video": true
          },
          {
            "id": "307630",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283466",
        "title": "Resilience, Observability and Monitoring",
        "units": [
          {
            "id": "289765",
            "title": "섹션소개",
            "seconds": 79,
            "video": true
          },
          {
            "id": "290734",
            "title": "Resilience 패턴 (Retry, Circuit Breaker, Bulkhead, Timeout, Fallback)",
            "seconds": 617,
            "video": true
          },
          {
            "id": "290735",
            "title": "Resilience 패턴 적용",
            "seconds": 959,
            "video": true
          },
          {
            "id": "290751",
            "title": "[실습 20] resilience4j를 이용한 회복성 패턴 ①",
            "seconds": 312,
            "video": true
          },
          {
            "id": "307054",
            "title": "[실습 21] resilience4j를 이용한 회복성 패턴 ②",
            "seconds": 895,
            "video": true
          },
          {
            "id": "290736",
            "title": "Observability를 위한 기술스택",
            "seconds": 1018,
            "video": true
          },
          {
            "id": "307055",
            "title": "[실습 22] Observability를 위한 OpenTelemetry + Zipkin + Fluentd 사용 ①",
            "seconds": 318,
            "video": true
          },
          {
            "id": "307056",
            "title": "[실습 23] Observability를 위한 OpenTelemetry + Zipkin + Fluentd 사용 ②",
            "seconds": 1294,
            "video": true
          },
          {
            "id": "307619",
            "title": "섹션 13 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283468",
        "title": "Security Patterns",
        "units": [
          {
            "id": "289766",
            "title": "섹션소개",
            "seconds": 62,
            "video": true
          },
          {
            "id": "289783",
            "title": "Authentication과 Authorization 패턴",
            "seconds": 705,
            "video": true
          },
          {
            "id": "289785",
            "title": "OWASP API Top 10",
            "seconds": 297,
            "video": true
          },
          {
            "id": "289786",
            "title": "Rate Limiting Strategies",
            "seconds": 623,
            "video": true
          },
          {
            "id": "290752",
            "title": "[실습 24] API 사용 제한을 위한 Rate Limiting 처리",
            "seconds": 664,
            "video": true
          },
          {
            "id": "307624",
            "title": "섹션 14 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283469",
        "title": "Testing Strategies",
        "units": [
          {
            "id": "289767",
            "title": "섹션소개",
            "seconds": 54,
            "video": true
          },
          {
            "id": "290729",
            "title": "Testing Strategies",
            "seconds": 1022,
            "video": true
          },
          {
            "id": "290730",
            "title": "Testing Pyramid",
            "seconds": 612,
            "video": true
          },
          {
            "id": "290753",
            "title": "[실습 25] Unit / Component / Integration / E2E Test ①",
            "seconds": 365,
            "video": true
          },
          {
            "id": "307057",
            "title": "[실습 26] Unit / Component / Integration / E2E Test ②",
            "seconds": 1160,
            "video": true
          },
          {
            "id": "307627",
            "title": "섹션 15 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283471",
        "title": "Scalability & Caching Patterns",
        "units": [
          {
            "id": "289768",
            "title": "섹션소개",
            "seconds": 88,
            "video": true
          },
          {
            "id": "290731",
            "title": "Scalability 개요",
            "seconds": 1869,
            "video": true
          },
          {
            "id": "290732",
            "title": "Distributed Cache",
            "seconds": 1178,
            "video": true
          },
          {
            "id": "290733",
            "title": "Database 확장과 Cache",
            "seconds": 677,
            "video": true
          },
          {
            "id": "290754",
            "title": "[실습 27] 분산 캐시 사용를 이용한 장바구니 처리 (Redis) ①",
            "seconds": 366,
            "video": true
          },
          {
            "id": "307058",
            "title": "[실습 28] 분산 캐시 사용를 이용한 장바구니 처리 (Redis) ②",
            "seconds": 1055,
            "video": true
          },
          {
            "id": "307631",
            "title": "섹션 16 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283472",
        "title": "Deployment Patterns",
        "units": [
          {
            "id": "289769",
            "title": "섹션소개",
            "seconds": 71,
            "video": true
          },
          {
            "id": "290737",
            "title": "Container 가상화 기술",
            "seconds": 993,
            "video": true
          },
          {
            "id": "290738",
            "title": "Container Orchestration 도구",
            "seconds": 1202,
            "video": true
          },
          {
            "id": "290739",
            "title": "Sidecar 패턴과 Service Mesh 패턴",
            "seconds": 580,
            "video": true
          },
          {
            "id": "290740",
            "title": "Deployment Strategies",
            "seconds": 915,
            "video": true
          },
          {
            "id": "290755",
            "title": "[실습 29] Blune-Green/Canary/AB Test 배포 전략 (Nginx) ①",
            "seconds": 670,
            "video": true
          },
          {
            "id": "307059",
            "title": "[실습 30] Blune-Green/Canary/AB Test 배포 전략 (Nginx) ②",
            "seconds": 1198,
            "video": true
          },
          {
            "id": "307632",
            "title": "섹션 17 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "283473",
        "title": "Serverless Microservice Architecture",
        "units": [
          {
            "id": "289770",
            "title": "섹션소개",
            "seconds": 93,
            "video": true
          },
          {
            "id": "300756",
            "title": "Serverless Microservices",
            "seconds": 1059,
            "video": true
          },
          {
            "id": "300757",
            "title": "Serverless Architecture",
            "seconds": 1136,
            "video": true
          },
          {
            "id": "300758",
            "title": "강의를 마치며",
            "seconds": 148,
            "video": true
          },
          {
            "id": "307628",
            "title": "섹션 18 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "extra-mysql": {
    "title": "비전공자도 이해할 수 있는 MySQL 성능 최적화 입문/실전 (SQL 튜닝편)",
    "url": "https://www.inflearn.com/course/%EB%B9%84%EC%A0%84%EA%B3%B5%EC%9E%90-mysql-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%95%ED%99%95-sql%ED%8A%9C%EB%8B%9D",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-30 20:26:39",
    "totalSeconds": 9765,
    "totalUnits": 39,
    "sections": [
      {
        "id": "232967",
        "title": "꼭!꼭! 들어봐야 하는 오리엔테이션 🦆",
        "units": [
          {
            "id": "232968",
            "title": "강의 소개",
            "seconds": 195,
            "video": true
          },
          {
            "id": "232970",
            "title": "소통하면서 듣는 인터넷 강의?!",
            "seconds": 111,
            "video": true
          },
          {
            "id": "232971",
            "title": "1:1 오픈 톡방(질문) / 마음의 소리함",
            "seconds": 0,
            "video": false
          },
          {
            "id": "232972",
            "title": "수업 자료 (Notion)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "315320",
            "title": "수업 자료 (PDF)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "293755",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "232969",
        "title": "MySQL 성능 최적화를 본격적으로 배우기 전에!",
        "units": [
          {
            "id": "232973",
            "title": "수업 듣기 전 환경 셋팅",
            "seconds": 117,
            "video": true
          },
          {
            "id": "232974",
            "title": "신입 백엔드 면접에서 자주 물어보는 ‘DB 성능 최적화’ 경험?!",
            "seconds": 215,
            "video": true
          },
          {
            "id": "232975",
            "title": "DB 성능 개선할 때 ‘SQL 튜닝’을 가장 먼저 해야 하는 이유 (vs 스케일업, 레플리케이션, 샤딩, 캐싱)",
            "seconds": 119,
            "video": true
          },
          {
            "id": "232976",
            "title": "성능 개선을 위한 MySQL 구조 파악 / SQL 튜닝의 핵심",
            "seconds": 247,
            "video": true
          },
          {
            "id": "293911",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "232977",
        "title": "인덱스(Index) 기본 개념 / 실전 활용법",
        "units": [
          {
            "id": "232978",
            "title": "인덱스(Index)란?",
            "seconds": 182,
            "video": true
          },
          {
            "id": "232979",
            "title": "[실습] 인덱스 직접 설정해보기 / 성능 측정해보기",
            "seconds": 712,
            "video": true
          },
          {
            "id": "232980",
            "title": "기본으로 설정되는 인덱스 (PK)",
            "seconds": 268,
            "video": true
          },
          {
            "id": "232981",
            "title": "제약 조건을 추가하면 자동으로 생성되는 인덱스 (UNIQUE)",
            "seconds": 128,
            "video": true
          },
          {
            "id": "232982",
            "title": "[실습] 인덱스를 무식하게 많이 걸면 어떻게 될까?",
            "seconds": 309,
            "video": true
          },
          {
            "id": "232983",
            "title": "멀티 컬럼 인덱스 (Mulitple-Column Index)란?",
            "seconds": 118,
            "video": true
          },
          {
            "id": "232984",
            "title": "[실습] 멀티 컬럼 인덱스 직접 설정해보기 / 작동방식 이해하기",
            "seconds": 209,
            "video": true
          },
          {
            "id": "232985",
            "title": "멀티 컬럼 인덱스 생성 시 주의점",
            "seconds": 197,
            "video": true
          },
          {
            "id": "247213",
            "title": "[보충 자료] 멀티 컬럼 인덱스 생성 시 주의점",
            "seconds": 0,
            "video": false
          },
          {
            "id": "232986",
            "title": "커버링 인덱스(Covering Index)란?",
            "seconds": 119,
            "video": true
          },
          {
            "id": "294720",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "232987",
        "title": "실행 계획(EXPLAIN)을 활용해 성능 저하 요인 찾아내기",
        "units": [
          {
            "id": "232988",
            "title": "SQL문의 ‘실행 계획’ 사용해보기 (EXPLAIN)",
            "seconds": 458,
            "video": true
          },
          {
            "id": "232989",
            "title": "실행 계획에서 type 의미 분석하기 (ALL, index)",
            "seconds": 274,
            "video": true
          },
          {
            "id": "232990",
            "title": "실행 계획에서 type 의미 분석하기 (const, range, ref)",
            "seconds": 403,
            "video": true
          },
          {
            "id": "292928",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "232991",
        "title": "SQL문 튜닝 연습하기",
        "units": [
          {
            "id": "232992",
            "title": "[실습] 한 번에 너무 많은 데이터를 조회하는 SQL문 튜닝하기",
            "seconds": 187,
            "video": true
          },
          {
            "id": "232993",
            "title": "[실습] WHERE문이 사용된 SQL문 튜닝하기 - 1",
            "seconds": 299,
            "video": true
          },
          {
            "id": "232994",
            "title": "[실습] WHERE문이 사용된 SQL문 튜닝하기 - 2",
            "seconds": 946,
            "video": true
          },
          {
            "id": "232995",
            "title": "[실습] 인덱스를 걸었는데도 인덱스가 작동하지 않는 경우 - 1",
            "seconds": 224,
            "video": true
          },
          {
            "id": "232996",
            "title": "[실습] 인덱스를 걸었는데도 인덱스가 작동하지 않는 경우 - 2",
            "seconds": 220,
            "video": true
          },
          {
            "id": "232997",
            "title": "[실습] ORDER BY문이 사용된 SQL문 튜닝하기",
            "seconds": 369,
            "video": true
          },
          {
            "id": "232998",
            "title": "[실습] WHERE문에 인덱스를 걸기 vs ORDER BY문에 인덱스를 걸기",
            "seconds": 554,
            "video": true
          },
          {
            "id": "232999",
            "title": "[실습] HAVING문이 사용된 SQL문 튜닝하기",
            "seconds": 422,
            "video": true
          },
          {
            "id": "293503",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "233000",
        "title": "실전 SQL문으로 튜닝 직접 해보기",
        "units": [
          {
            "id": "233219",
            "title": "안내 사항",
            "seconds": 0,
            "video": false
          },
          {
            "id": "233001",
            "title": "[실습] 유저 이름으로 특정 기간에 작성된 글 검색하는 SQL문 튜닝하기",
            "seconds": 279,
            "video": true
          },
          {
            "id": "233002",
            "title": "[실습] 특정 부서에서 최대 연봉을 가진 사용자들 조회하는 SQL문 튜닝하기",
            "seconds": 242,
            "video": true
          },
          {
            "id": "233003",
            "title": "[실습] 부서별 최대 연봉을 가진 사용자들 조회하는 SQL문 튜닝하기",
            "seconds": 245,
            "video": true
          },
          {
            "id": "233004",
            "title": "[실습] 2023년 주문 데이터 조회하는 SQL문 튜닝하기",
            "seconds": 259,
            "video": true
          },
          {
            "id": "233005",
            "title": "[실습] 2024년 1학기 평균 성적이 100점인 학생 조회하는 SQL문 튜닝하기",
            "seconds": 242,
            "video": true
          },
          {
            "id": "233006",
            "title": "[실습] 좋아요 많은 순으로 게시글 조회하는 SQL문 튜닝하기",
            "seconds": 815,
            "video": true
          },
          {
            "id": "293119",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "233007",
        "title": "마무리",
        "units": [
          {
            "id": "233008",
            "title": "이 다음에는 어떤 걸 공부해야 하나요?",
            "seconds": 81,
            "video": true
          },
          {
            "id": "235623",
            "title": "완강을 축하드립니다!! 🎉🎉🎉",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "17": {
    "title": "카카오 면접관이 알려주는 문서기반의 프레임워크 통신 패턴을 위한 GraphQL",
    "url": "https://www.inflearn.com/course/graphql-for-document",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-07-24 19:39:38",
    "totalSeconds": 14316,
    "totalUnits": 16,
    "sections": [
      {
        "id": "439089",
        "title": "강의 소개",
        "units": [
          {
            "id": "439090",
            "title": "강의 소개",
            "seconds": 334,
            "video": true
          }
        ]
      },
      {
        "id": "449799",
        "title": "GraphQL의 핵심 개념",
        "units": [
          {
            "id": "449776",
            "title": "GraphQL의 등장배경과 타입 시스템",
            "seconds": 996,
            "video": true
          },
          {
            "id": "449777",
            "title": "3가지 통신 패턴 및 횡단 관심사를 위한 Directive와 설계 원칙",
            "seconds": 1191,
            "video": true
          }
        ]
      },
      {
        "id": "449800",
        "title": "가장 기본적인 개발 환경 구성하고 실행하기",
        "units": [
          {
            "id": "449778",
            "title": "Apollo GraphQL을 활용한 첫번쨰 GraphQL 실습",
            "seconds": 1034,
            "video": true
          },
          {
            "id": "449779",
            "title": "Swagger 그 이상의 기능! Introspection과 자기문서화",
            "seconds": 635,
            "video": true
          }
        ]
      },
      {
        "id": "449801",
        "title": "블로그 프로젝트를 모방한 CRUD 및 Prisma를 활용한 데이터베이스 연동",
        "units": [
          {
            "id": "449780",
            "title": "GraphQL 확장자를 활용한 블로그 프로젝트 초기 셋팅",
            "seconds": 969,
            "video": true
          },
          {
            "id": "449781",
            "title": "GraphQL에서의 타입간 관계 정의",
            "seconds": 542,
            "video": true
          },
          {
            "id": "449782",
            "title": "Prisma를 활용한 데이터 마이그레이션 및 GUI 툴",
            "seconds": 844,
            "video": true
          },
          {
            "id": "449783",
            "title": "Prisma 연동과 N+1 문제 및 Include 강제 패턴",
            "seconds": 1121,
            "video": true
          },
          {
            "id": "465887",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "449802",
        "title": "실무적인 관점에서의 GraphQL의 고급 패턴",
        "units": [
          {
            "id": "449784",
            "title": "범용 미들웨어 처리를 위한 Context를 활용한 인증 및 인가 패턴",
            "seconds": 1373,
            "video": true
          },
          {
            "id": "449785",
            "title": "Database의 가장 치명적인 문제 N+1 문제 방지를 위한 DataLoader 패턴",
            "seconds": 1018,
            "video": true
          },
          {
            "id": "449786",
            "title": "서비스 UI를 위한 가장 기본 패턴! GraphQL의 Connection Paging",
            "seconds": 739,
            "video": true
          },
          {
            "id": "449787",
            "title": "GraphQL의 Custom Error 패턴을 활용한 코드 관리",
            "seconds": 495,
            "video": true
          },
          {
            "id": "465888",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "449775",
        "title": "비동기 통신부터 테스트 코드 및 분산환경 대응까지",
        "units": [
          {
            "id": "449788",
            "title": "비동기 및 이벤트 통신(PubSub)을 위한 Subscription 패턴",
            "seconds": 1099,
            "video": true
          },
          {
            "id": "449789",
            "title": "서비스 단위 테스트부터 통합 테스트 진행하기",
            "seconds": 1163,
            "video": true
          },
          {
            "id": "449790",
            "title": "분산 환경을 대비하는 Federation 패턴을 활용한 GraphQL의 MSA",
            "seconds": 763,
            "video": true
          },
          {
            "id": "465886",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "40": {
    "title": "Spring Batch 입문: 3시간 만에 끝내는 대용량 처리의 기초",
    "url": "https://www.inflearn.com/course/spring-batch-%EC%9E%85%EB%AC%B8-3%EC%8B%9C%EA%B0%84",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-30 20:28:44",
    "totalSeconds": 12238,
    "totalUnits": 45,
    "sections": [
      {
        "id": "410479",
        "title": "오리엔테이션",
        "units": [
          {
            "id": "410482",
            "title": "강의소개",
            "seconds": 284,
            "video": true
          },
          {
            "id": "411024",
            "title": "강의자료 노션 링크 및 전체 소스 코드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "410890",
            "title": "1:1 질문 오픈카톡방 & 시니 우체통 소개",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410481",
        "title": "Spring Batch의 필요성",
        "units": [
          {
            "id": "410483",
            "title": "스프링 배치를 왜 배우는걸까?",
            "seconds": 393,
            "video": true
          },
          {
            "id": "410485",
            "title": "[보충자료] 현존하는 최고의 배치 툴 Spring Batch 6",
            "seconds": 249,
            "video": true
          }
        ]
      },
      {
        "id": "410800",
        "title": "Spring Batch의 핵심 컴포넌트",
        "units": [
          {
            "id": "410484",
            "title": "스프링 배치의 핵심 컴포넌트 - Job, Step, Repository, Operator",
            "seconds": 453,
            "video": true
          },
          {
            "id": "410486",
            "title": "[실습] 스프링 배치 프로젝트 생성(Spring Boot 4.x & Gradle)",
            "seconds": 301,
            "video": true
          },
          {
            "id": "410487",
            "title": "[실습] 카페 시뮬레이션으로 익히는 Job 구성과 실행 흐름",
            "seconds": 1242,
            "video": true
          },
          {
            "id": "410993",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410816",
        "title": "배치 처리의 방법1 - Tasklet 지향 처리",
        "units": [
          {
            "id": "410488",
            "title": "Tasklet 지향 처리란?",
            "seconds": 232,
            "video": true
          },
          {
            "id": "410489",
            "title": "[실습] Tasklet 인터페이스로 단일 배치 작업 처리하기",
            "seconds": 244,
            "video": true
          },
          {
            "id": "410490",
            "title": "while문으로 한 번에 처리하면 안되는 이유",
            "seconds": 110,
            "video": true
          },
          {
            "id": "410491",
            "title": "트랜잭션 처리가 불필요한 배치는 어떻게 만들까?",
            "seconds": 132,
            "video": true
          },
          {
            "id": "410492",
            "title": "[실습] 오래된 접속 로그 자동 삭제 하는 기능 구현하기(1) - 테스트용 샘플로그 만들기",
            "seconds": 151,
            "video": true
          },
          {
            "id": "410493",
            "title": "[실습] 오래된 접속 로그 자동 삭제 하는 기능 구현하기(2) - Tasklet 방식으로 배치 작성하기",
            "seconds": 547,
            "video": true
          },
          {
            "id": "410494",
            "title": "[실습] 오래된 접속 로그 자동 삭제 하는 기능 구현하기(3) - 작성한 배치 Step과 Job으로 등록하기",
            "seconds": 326,
            "video": true
          },
          {
            "id": "410990",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410801",
        "title": "배치 처리의 방법2 - Chunk 지향 처리",
        "units": [
          {
            "id": "410495",
            "title": "Chunk 지향 처리란?",
            "seconds": 162,
            "video": true
          },
          {
            "id": "410496",
            "title": "ItemReader란? / ItemProcessor란? / ItemWriter란?",
            "seconds": 225,
            "video": true
          },
          {
            "id": "410497",
            "title": "[실습] 실무 배치의 90% Reader, Processor, Writer를 활용한 청크 지향 처리 실습",
            "seconds": 580,
            "video": true
          },
          {
            "id": "410498",
            "title": "청크가 마지막을 판단하는 기준은 뭘까?",
            "seconds": 145,
            "video": true
          },
          {
            "id": "410992",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410802",
        "title": "배치 작업의 입력값 JobParameters & Step Scope 어노테이션",
        "units": [
          {
            "id": "410499",
            "title": "JobParameters란?",
            "seconds": 180,
            "video": true
          },
          {
            "id": "410500",
            "title": "[실습] JobParameters로 날짜 전달 받는 동적 배치 만들어보기",
            "seconds": 548,
            "video": true
          },
          {
            "id": "410501",
            "title": "@StepScope 어노테이션을 붙이는 이유",
            "seconds": 219,
            "video": true
          },
          {
            "id": "410995",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410803",
        "title": "배치의 감시자 Listener",
        "units": [
          {
            "id": "410503",
            "title": "리스너(Listener) 배치의 CCTV",
            "seconds": 101,
            "video": true
          },
          {
            "id": "410504",
            "title": "JobExecutionListener란? / StepExecutionListener란?",
            "seconds": 191,
            "video": true
          },
          {
            "id": "410505",
            "title": "[실습] 배치 리스너 인터페이스와 어노테이션으로 구현해보기",
            "seconds": 529,
            "video": true
          },
          {
            "id": "410506",
            "title": "[실습] 배치 실패시 서버 담당자에게 메일 보내주기",
            "seconds": 673,
            "video": true
          },
          {
            "id": "410991",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410502",
        "title": "최종프로젝트 : Spring Batch를 통한 정산 시스템 구축 (100만 건 데이터 처리)",
        "units": [
          {
            "id": "410507",
            "title": "[실습] 배달 플랫폼 '배달의 시니' 정산 시스템 요구사항 정의서",
            "seconds": 340,
            "video": true
          },
          {
            "id": "410508",
            "title": "[실습] 최종 프로젝트 생성(스프링 4.x, 스프링배치 6.x, Gradle, Spring Data JPA)",
            "seconds": 271,
            "video": true
          },
          {
            "id": "410509",
            "title": "[실습] 주문, 정산 도메인 설계",
            "seconds": 349,
            "video": true
          },
          {
            "id": "410510",
            "title": "[실습] 100만건 샘플 더미 데이터 삽입",
            "seconds": 135,
            "video": true
          },
          {
            "id": "410511",
            "title": "[실습] ItemReader 구현하기",
            "seconds": 463,
            "video": true
          },
          {
            "id": "410512",
            "title": "[실습] ItemProcessor 구현하기",
            "seconds": 185,
            "video": true
          },
          {
            "id": "410513",
            "title": "[실습] ItemWriter 구현하기",
            "seconds": 93,
            "video": true
          },
          {
            "id": "410514",
            "title": "아키텍쳐 구조로 보는 배치 작업",
            "seconds": 172,
            "video": true
          },
          {
            "id": "410515",
            "title": "[실습] Step과 Job 등록하기",
            "seconds": 163,
            "video": true
          },
          {
            "id": "410516",
            "title": "[보충자료] 크론(Cron) 표기법 가이드",
            "seconds": 221,
            "video": true
          },
          {
            "id": "410517",
            "title": "[실습] 스케줄러 등록하기",
            "seconds": 306,
            "video": true
          },
          {
            "id": "410518",
            "title": "[실습] 스케줄러를 위한 메인 메소드 수정하기",
            "seconds": 167,
            "video": true
          }
        ]
      },
      {
        "id": "410805",
        "title": "현업에서 많이 사용하는 Jenkins를 연동한 Spring Batch",
        "units": [
          {
            "id": "410519",
            "title": "[실습] 배치 Listener 적용하기",
            "seconds": 182,
            "video": true
          },
          {
            "id": "410520",
            "title": "[실습] Jenkins 연동을 위한 메인 메소드 및 환경설정 수정",
            "seconds": 190,
            "video": true
          },
          {
            "id": "410522",
            "title": "[실습] 실행 파일(JAR) 빌드하기",
            "seconds": 96,
            "video": true
          },
          {
            "id": "410523",
            "title": "[실습] Jenkins 설치 및 설정",
            "seconds": 103,
            "video": true
          },
          {
            "id": "410524",
            "title": "[실습] Jenkins에 배치 등록 후 무인화 하기",
            "seconds": 400,
            "video": true
          },
          {
            "id": "410994",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "410845",
        "title": "완강을 축하드립니다!",
        "units": [
          {
            "id": "410846",
            "title": "앞으로 공부해야 할 방향",
            "seconds": 185,
            "video": true
          },
          {
            "id": "422944",
            "title": "완강을 축하드립니다!![시크릿 선물] 🎁🎁🎁",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "37": {
    "title": "핵심만 빠르게 끝내는 실전 카프카(kafka)",
    "url": "https://www.inflearn.com/course/practical-kafka-gett-1",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-03-03 17:21:32",
    "totalSeconds": 11004,
    "totalUnits": 11,
    "sections": [
      {
        "id": "271497",
        "title": "수업개요",
        "units": [
          {
            "id": "271498",
            "title": "수업 전반 개요",
            "seconds": 275,
            "video": true
          },
          {
            "id": "358534",
            "title": "카프카 주요 특장점",
            "seconds": 466,
            "video": true
          },
          {
            "id": "358535",
            "title": "카프카 사용사례",
            "seconds": 1279,
            "video": true
          },
          {
            "id": "421416",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "417914",
        "title": "카프카구조",
        "units": [
          {
            "id": "417915",
            "title": "카프카 클러스터 구조",
            "seconds": 1387,
            "video": true
          },
          {
            "id": "417916",
            "title": "프로듀서와 컨슈머",
            "seconds": 935,
            "video": true
          }
        ]
      },
      {
        "id": "417917",
        "title": "카프카와 SpringBoot실습",
        "units": [
          {
            "id": "417918",
            "title": "kafka 실습환경 구성",
            "seconds": 1290,
            "video": true
          },
          {
            "id": "417919",
            "title": "실습1)기본 메시지 송/수신",
            "seconds": 642,
            "video": true
          },
          {
            "id": "417920",
            "title": "실습2)컨슈머그룹설정(그룹ID, offset-reset)",
            "seconds": 980,
            "video": true
          },
          {
            "id": "417921",
            "title": "실습3)key값에 따른 메시지 순서보장",
            "seconds": 776,
            "video": true
          },
          {
            "id": "420877",
            "title": "실습4)offset 수동 커밋",
            "seconds": 1488,
            "video": true
          },
          {
            "id": "420900",
            "title": "실전사례소개 및 수업마무리",
            "seconds": 1486,
            "video": true
          },
          {
            "id": "421417",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "21": {
    "title": "코드로 끝내는 분산 트랜잭션 (feat. AI Agent)",
    "url": "https://www.inflearn.com/course/distributed-transact-1",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-09 17:16:37",
    "totalSeconds": 26522,
    "totalUnits": 38,
    "sections": [
      {
        "id": "480948",
        "title": "[0단계] 강의 준비",
        "units": [
          {
            "id": "481038",
            "title": "강의 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "480951",
            "title": "[0-0] 분산 트랜잭션의 이해",
            "seconds": 1370,
            "video": true
          },
          {
            "id": "480952",
            "title": "[0-1] 실습 준비",
            "seconds": 374,
            "video": true
          }
        ]
      },
      {
        "id": "480989",
        "title": "[1단계] 모놀리식 아키텍처로 만들기",
        "units": [
          {
            "id": "480953",
            "title": "[1-1] 프로젝트 기본 설정",
            "seconds": 892,
            "video": true
          },
          {
            "id": "480954",
            "title": "[1-2] 코드 및 동작 확인",
            "seconds": 885,
            "video": true
          },
          {
            "id": "480955",
            "title": "[1-3] 결과 이해하기",
            "seconds": 137,
            "video": true
          },
          {
            "id": "481049",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480990",
        "title": "[2단계] MSA로 만들기",
        "units": [
          {
            "id": "480956",
            "title": "[2-1] MSA로 만들기",
            "seconds": 474,
            "video": true
          },
          {
            "id": "480957",
            "title": "[2-2] 코드 및 동작 확인",
            "seconds": 781,
            "video": true
          },
          {
            "id": "480958",
            "title": "[2-3] 결과 이해하기",
            "seconds": 347,
            "video": true
          },
          {
            "id": "481048",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480991",
        "title": "[3단계] 보상 트랜잭션 구현하기",
        "units": [
          {
            "id": "480959",
            "title": "[3-1] 보상 트랜잭션 구현하기",
            "seconds": 625,
            "video": true
          },
          {
            "id": "480960",
            "title": "[3-2] 코드 및 동작 확인",
            "seconds": 1096,
            "video": true
          }
        ]
      },
      {
        "id": "480992",
        "title": "[4단계] TCC 패턴으로 구현하기",
        "units": [
          {
            "id": "480961",
            "title": "[4-1] TCC 패턴 이해하기",
            "seconds": 631,
            "video": true
          },
          {
            "id": "480962",
            "title": "[4-2] TCC 패턴 구현하기",
            "seconds": 734,
            "video": true
          },
          {
            "id": "480963",
            "title": "[4-3] 코드 및 동작 확인",
            "seconds": 806,
            "video": true
          },
          {
            "id": "480964",
            "title": "[4-4] 2PC vs TCC",
            "seconds": 551,
            "video": true
          },
          {
            "id": "481046",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480993",
        "title": "[5단계] Saga 패턴(Orchestration) 구현하기",
        "units": [
          {
            "id": "480965",
            "title": "[5-1] Saga 패턴 이해하기",
            "seconds": 691,
            "video": true
          },
          {
            "id": "480966",
            "title": "[5-2] 코드 되돌리기",
            "seconds": 300,
            "video": true
          },
          {
            "id": "480967",
            "title": "[5-3] 오케스트레이션 Saga 패턴 구현하기",
            "seconds": 335,
            "video": true
          },
          {
            "id": "480968",
            "title": "[5-4] 코드 및 동작 확인 1",
            "seconds": 806,
            "video": true
          },
          {
            "id": "480969",
            "title": "[5-5] 코드 및 동작 확인 2",
            "seconds": 582,
            "video": true
          },
          {
            "id": "480970",
            "title": "[5-6] 보상 트랜잭션 실패시키기",
            "seconds": 1323,
            "video": true
          },
          {
            "id": "480972",
            "title": "[5-7] 코드 개선하기",
            "seconds": 275,
            "video": true
          },
          {
            "id": "480973",
            "title": "[5-8] Temporal 이해하기",
            "seconds": 1076,
            "video": true
          },
          {
            "id": "481050",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480950",
        "title": "[6단계] Saga 패턴(Choreography) 구현하기",
        "units": [
          {
            "id": "480974",
            "title": "[6-1] 코레오그래피 Saga 패턴 이해하기",
            "seconds": 773,
            "video": true
          },
          {
            "id": "480975",
            "title": "[6-2] 코레오그래피 Saga 패턴으로 전환하기",
            "seconds": 559,
            "video": true
          },
          {
            "id": "480976",
            "title": "[6-3] 코드 및 동작 확인 1",
            "seconds": 544,
            "video": true
          },
          {
            "id": "480977",
            "title": "[6-4] 코드 및 동작 확인 2",
            "seconds": 671,
            "video": true
          },
          {
            "id": "480978",
            "title": "[6-5] 코드 및 동작 확인 3",
            "seconds": 811,
            "video": true
          },
          {
            "id": "480979",
            "title": "[6-6] 카프카 이해하기",
            "seconds": 1021,
            "video": true
          },
          {
            "id": "480980",
            "title": "[6-7] 오케스트레이션 vs 코레오그래피",
            "seconds": 281,
            "video": true
          },
          {
            "id": "481047",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480994",
        "title": "[7단계] Transactional Outbox 패턴 구현하기",
        "units": [
          {
            "id": "480981",
            "title": "[7-1] Transactional Outbox 패턴 이해하기",
            "seconds": 1259,
            "video": true
          },
          {
            "id": "480982",
            "title": "[7-2] Transactional Outbox 패턴 구현하기",
            "seconds": 1342,
            "video": true
          }
        ]
      },
      {
        "id": "480995",
        "title": "[8단계] 멱등성(Idempotency) 보장하기",
        "units": [
          {
            "id": "480983",
            "title": "[8-1] 멱등성 개념 이해하기",
            "seconds": 766,
            "video": true
          },
          {
            "id": "480984",
            "title": "[8-2] 멱등성 문제 재현하기",
            "seconds": 1004,
            "video": true
          },
          {
            "id": "480985",
            "title": "[8-3] 멱등성 처리 구현하기",
            "seconds": 703,
            "video": true
          },
          {
            "id": "481052",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "480971",
        "title": "[9단계] 회복력(Resilience) 설계하기",
        "units": [
          {
            "id": "480986",
            "title": "[9-1] 회복력 개념 이해하기",
            "seconds": 377,
            "video": true
          },
          {
            "id": "480987",
            "title": "[9-2] 서킷브레이커 적용하기",
            "seconds": 518,
            "video": true
          },
          {
            "id": "480988",
            "title": "[9-3] 코드 및 동작 확인",
            "seconds": 802,
            "video": true
          },
          {
            "id": "481051",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "10": {
    "title": "주문시스템으로 알아보는 분산트랜잭션",
    "url": "https://www.inflearn.com/course/%EC%A3%BC%EB%AC%B8%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%EB%B6%84%EC%82%B0%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-10-21 00:13:48",
    "totalSeconds": 20254,
    "totalUnits": 46,
    "sections": [
      {
        "id": "317178",
        "title": "강의소개 및 준비",
        "units": [
          {
            "id": "317179",
            "title": "강의 소개",
            "seconds": 98,
            "video": true
          },
          {
            "id": "317180",
            "title": "환경세팅",
            "seconds": 209,
            "video": true
          }
        ]
      },
      {
        "id": "317181",
        "title": "Monolithic 으로 작성해보기",
        "units": [
          {
            "id": "359916",
            "title": "소스코드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "320849",
            "title": "프로젝트 세팅",
            "seconds": 200,
            "video": true
          },
          {
            "id": "321521",
            "title": "요구사항 정의",
            "seconds": 60,
            "video": true
          },
          {
            "id": "321528",
            "title": "간단한 재고관리 로직 구현해보기",
            "seconds": 278,
            "video": true
          },
          {
            "id": "321529",
            "title": "간단한 포인트관리 로직 작성해보기",
            "seconds": 237,
            "video": true
          },
          {
            "id": "321530",
            "title": "간단한 주문로직 작성해보기",
            "seconds": 824,
            "video": true
          },
          {
            "id": "323828",
            "title": "Transaction 을 사용하여 정합성 보장하기",
            "seconds": 308,
            "video": true
          },
          {
            "id": "323829",
            "title": "동일한 주문인지 알 수 있도록 주문로직 수정하기",
            "seconds": 892,
            "video": true
          },
          {
            "id": "323878",
            "title": "Lock 을 활용하여 주문로직이 1번만 수행되도록 변경하기",
            "seconds": 464,
            "video": true
          },
          {
            "id": "325974",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "324024",
        "title": "Monolithic 에서 MSA 로",
        "units": [
          {
            "id": "324030",
            "title": "MSA 로 전환하기 위한 토대 구성하기",
            "seconds": 522,
            "video": true
          },
          {
            "id": "324036",
            "title": "MSA 에서 발생할 수 있는 문제점",
            "seconds": 188,
            "video": true
          }
        ]
      },
      {
        "id": "324543",
        "title": "MSA 환경에서 트랜잭션 제어하기 - 2PC",
        "units": [
          {
            "id": "324544",
            "title": "2PC 란 무엇인가?",
            "seconds": 562,
            "video": true
          }
        ]
      },
      {
        "id": "325167",
        "title": "MSA 환경에서 트랜잭션 제어하기 - TCC",
        "units": [
          {
            "id": "324565",
            "title": "TCC 란 무엇인가?",
            "seconds": 179,
            "video": true
          },
          {
            "id": "325064",
            "title": "TCC 구현하기(1) - Product Try API 구현하기",
            "seconds": 895,
            "video": true
          },
          {
            "id": "325074",
            "title": "TCC 구현하기(2) - 동시성문제 해결하기",
            "seconds": 382,
            "video": true
          },
          {
            "id": "325165",
            "title": "TCC 구현하기(3) - Product Confirm API 구현하기",
            "seconds": 578,
            "video": true
          },
          {
            "id": "325166",
            "title": "TCC 구현하기(4) - Product Cancel API 구현하기",
            "seconds": 416,
            "video": true
          },
          {
            "id": "325228",
            "title": "TCC 구현하기(5) - Point Try API 구현하기",
            "seconds": 698,
            "video": true
          },
          {
            "id": "325229",
            "title": "TCC 구현하기(6) - Point Confirm API 구현하기",
            "seconds": 456,
            "video": true
          },
          {
            "id": "325230",
            "title": "TCC 구현하기(7) - Point Cancel API 구현하기",
            "seconds": 366,
            "video": true
          },
          {
            "id": "325609",
            "title": "TCC 구현하기(8) - Order service 구현하기",
            "seconds": 1445,
            "video": true
          },
          {
            "id": "325611",
            "title": "TCC 구현하기(9) - 주문하기 API 구현하기",
            "seconds": 393,
            "video": true
          },
          {
            "id": "325612",
            "title": "TCC 구현하기(10) - Retry 를 활용하여 일시적인 오류에 대처하기",
            "seconds": 634,
            "video": true
          },
          {
            "id": "325955",
            "title": "TCC 구현하기(11) - Pending 상태인 주문 해소 전략",
            "seconds": 281,
            "video": true
          },
          {
            "id": "325975",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "325610",
        "title": "MSA 환경에서 트랜잭션 제어하기 - SAGA (Orchestration)",
        "units": [
          {
            "id": "337588",
            "title": "Saga란 무엇인가 ?",
            "seconds": 188,
            "video": true
          },
          {
            "id": "337601",
            "title": "Saga - Orchestration 방식이란 ?",
            "seconds": 83,
            "video": true
          },
          {
            "id": "337602",
            "title": "Orchestration - 재고차감 API 구현",
            "seconds": 951,
            "video": true
          },
          {
            "id": "337613",
            "title": "Orchestration - 재고차감취소 API 구현",
            "seconds": 577,
            "video": true
          },
          {
            "id": "337614",
            "title": "Orchestration - 포인트차감 API 구현",
            "seconds": 655,
            "video": true
          },
          {
            "id": "337623",
            "title": "Orchestration - 포인트차감취소 API 구현",
            "seconds": 456,
            "video": true
          },
          {
            "id": "337624",
            "title": "Orchestration - Order 생성 API 구현",
            "seconds": 393,
            "video": true
          },
          {
            "id": "337625",
            "title": "Orchestration - API Client 구현",
            "seconds": 574,
            "video": true
          },
          {
            "id": "337626",
            "title": "Orchestration - 주문 API 구현",
            "seconds": 1097,
            "video": true
          },
          {
            "id": "337627",
            "title": "Orchestration - 실패상황 테스트",
            "seconds": 183,
            "video": true
          },
          {
            "id": "337628",
            "title": "Orchestration - 현재구조의 문제점과 해결방법",
            "seconds": 508,
            "video": true
          }
        ]
      },
      {
        "id": "344372",
        "title": "MSA 환경에서 트랜잭션 제어하기 - SAGA (Choreography)",
        "units": [
          {
            "id": "325831",
            "title": "SAGA - Choreography 방식이란 ?",
            "seconds": 125,
            "video": true
          },
          {
            "id": "344374",
            "title": "Kafka 란 무엇인가?",
            "seconds": 234,
            "video": true
          },
          {
            "id": "344376",
            "title": "Choreography - 주문이벤트 발행",
            "seconds": 518,
            "video": true
          },
          {
            "id": "344377",
            "title": "Choreography - 주문이벤트 처리",
            "seconds": 635,
            "video": true
          },
          {
            "id": "344379",
            "title": "Choreography - 재고차감 이벤트 처리",
            "seconds": 624,
            "video": true
          },
          {
            "id": "344380",
            "title": "Choreography - 포인트차감 이벤트 처리",
            "seconds": 291,
            "video": true
          },
          {
            "id": "344381",
            "title": "Choreography - Order 상태조회 API 구현",
            "seconds": 152,
            "video": true
          },
          {
            "id": "344382",
            "title": "Choreography - 테스트",
            "seconds": 303,
            "video": true
          }
        ]
      },
      {
        "id": "325832",
        "title": "마무리",
        "units": [
          {
            "id": "325833",
            "title": "실무에서는 많이 사용하는것은 무엇인가요 ?",
            "seconds": 142,
            "video": true
          }
        ]
      }
    ]
  },
  "26": {
    "title": "모든 웹 개발자가 봐야 할 단 한 장의 지도",
    "url": "https://www.inflearn.com/course/%EB%AA%A8%EB%93%A0-%EC%9B%B9-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%B4%90%EC%95%BC-%ED%95%A0-%EB%8B%A8-%ED%95%9C-%EC%9E%A5",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-08-11 09:00:00",
    "totalSeconds": 4623,
    "totalUnits": 7,
    "sections": [
      {
        "id": "334978",
        "title": "시작에 앞서 알아야 할 것",
        "units": [
          {
            "id": "334979",
            "title": "강의소개 및 학습목표",
            "seconds": 207,
            "video": true
          },
          {
            "id": "334980",
            "title": "웹 기술의 창시자",
            "seconds": 369,
            "video": true
          },
          {
            "id": "334981",
            "title": "URL과 URI",
            "seconds": 426,
            "video": true
          },
          {
            "id": "334982",
            "title": "가볍게 살펴보는 HTTP",
            "seconds": 352,
            "video": true
          },
          {
            "id": "336347",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "334983",
        "title": "웹 서비스 구조",
        "units": [
          {
            "id": "334984",
            "title": "초기 웹 서비스 구조",
            "seconds": 934,
            "video": true
          },
          {
            "id": "334985",
            "title": "WAS와 REST API",
            "seconds": 1840,
            "video": true
          },
          {
            "id": "334986",
            "title": "보안 시스템 이야기로 마무리",
            "seconds": 495,
            "video": true
          },
          {
            "id": "336348",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "30": {
    "title": "코덱스 참교육 - Codex 업무 자동화부터 바이브 코딩까지",
    "url": "https://www.inflearn.com/course/codex-true-education",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-09-04 09:33:30",
    "totalSeconds": 39399,
    "totalUnits": 58,
    "sections": [
      {
        "id": "473286",
        "title": "인트로",
        "units": [
          {
            "id": "489528",
            "title": "코덱스 소개 & 강의에서 배울 것",
            "seconds": 435,
            "video": true
          },
          {
            "id": "474688",
            "title": "🖱️ 실습에 사용되는 프롬프트 복사하기 & 질문하는 방법",
            "seconds": 0,
            "video": false
          },
          {
            "id": "474278",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "463056",
        "title": "설치와 세팅",
        "units": [
          {
            "id": "471264",
            "title": "[ 🚨 필독 ] 강의와 화면, 용어가 다를 수 있습니다.",
            "seconds": 0,
            "video": false
          },
          {
            "id": "463057",
            "title": "ChatGPT 코덱스 모드(구 코덱스 앱) 설치하기",
            "seconds": 782,
            "video": true
          },
          {
            "id": "463058",
            "title": "코드 에디터에 코덱스 확장 설치하기",
            "seconds": 662,
            "video": true
          },
          {
            "id": "471231",
            "title": "🆘 VS Code에서 폴더를 열었는데 코덱스 버튼이 안 보인다면?",
            "seconds": 0,
            "video": false
          },
          {
            "id": "463059",
            "title": "터미널에 코덱스 설치하기 (이 레슨도 꼭 수강해주세요!)",
            "seconds": 563,
            "video": true
          },
          {
            "id": "474263",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464233",
        "title": "코덱스 기본 사용법",
        "units": [
          {
            "id": "464234",
            "title": "플러그인 사용해보기",
            "seconds": 869,
            "video": true
          },
          {
            "id": "464858",
            "title": "자동화 사용해보기",
            "seconds": 858,
            "video": true
          },
          {
            "id": "465377",
            "title": "다른 기본 기능들 (스티어링, 터미널 세션 이어가기...)",
            "seconds": 1027,
            "video": true
          },
          {
            "id": "466553",
            "title": "다른 기본 기능들 (하위 에이전트, 플랜 모드, 주석, 리뷰, 사이드 채팅, 이미지 생성...)",
            "seconds": 1105,
            "video": true
          },
          {
            "id": "468044",
            "title": "🌐 웹개발 기초 무료로 배우기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "474281",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "468040",
        "title": "코덱스 더 잘 사용하기",
        "units": [
          {
            "id": "468041",
            "title": "슬래시 커맨드 1",
            "seconds": 1213,
            "video": true
          },
          {
            "id": "468446",
            "title": "슬래시 커맨드 2",
            "seconds": 514,
            "video": true
          },
          {
            "id": "473863",
            "title": "[복습] 슬래시 커맨드 핵심 요약 & 팁",
            "seconds": 0,
            "video": false
          },
          {
            "id": "470743",
            "title": "골(Goal) 모드",
            "seconds": 563,
            "video": true
          },
          {
            "id": "473879",
            "title": "사이트 - Supabase를 안 써도 된다고!?",
            "seconds": 939,
            "video": true
          },
          {
            "id": "474258",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "471180",
        "title": "하네스로 코덱스 참교육하기",
        "units": [
          {
            "id": "471181",
            "title": "하네스 엔지니어링의 개념",
            "seconds": 452,
            "video": true
          },
          {
            "id": "471475",
            "title": "config.toml - 나에게 맞춘 코덱스 설정",
            "seconds": 1018,
            "video": true
          },
          {
            "id": "473858",
            "title": "[복습] config.toml 핵심 요약 & 팁",
            "seconds": 0,
            "video": false
          },
          {
            "id": "474090",
            "title": "🔐 [개발자용] 권한/승인 설정 더 자세히 알기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "471479",
            "title": "📦 [개발자용] 샌드박스 설정 더 자세히 알기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "472216",
            "title": "AGENTS.md - 에이전트에게 건네는 지침서",
            "seconds": 973,
            "video": true
          },
          {
            "id": "473860",
            "title": "[복습]  AGENTS.md 핵심 요약 & 팁",
            "seconds": 0,
            "video": false
          },
          {
            "id": "480104",
            "title": "좋은 AGENTS.md 작성 예시들",
            "seconds": 0,
            "video": false
          },
          {
            "id": "472896",
            "title": "스킬 - 반복 작업을 위한 레시피",
            "seconds": 955,
            "video": true
          },
          {
            "id": "473861",
            "title": "[복습] 스킬 핵심 요약 & 팁",
            "seconds": 0,
            "video": false
          },
          {
            "id": "480112",
            "title": "좋은 SKILL.md 작성 예시들",
            "seconds": 0,
            "video": false
          },
          {
            "id": "473278",
            "title": "MCP와 플러그인 - 코덱스의 능력을 넓히는 도구",
            "seconds": 938,
            "video": true
          },
          {
            "id": "473862",
            "title": "[복습] MCP와 플러그인 요약 & 팁",
            "seconds": 0,
            "video": false
          },
          {
            "id": "473503",
            "title": "프롬프트와 완료 조건",
            "seconds": 1051,
            "video": true
          },
          {
            "id": "474261",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "472894",
        "title": "버전 관리하기",
        "units": [
          {
            "id": "472897",
            "title": "[필독] 다음 레슨을 듣기 전에...",
            "seconds": 0,
            "video": false
          },
          {
            "id": "472895",
            "title": "[🛑 시청필수 아님 🤚] Git의 개념 & 사용법 알아보기",
            "seconds": 7480,
            "video": true
          },
          {
            "id": "473281",
            "title": "버전 저장 & 이전 상태로 되돌리기",
            "seconds": 1138,
            "video": true
          },
          {
            "id": "474822",
            "title": "브랜치 - 프로젝트의 멀티버스",
            "seconds": 930,
            "video": true
          },
          {
            "id": "474127",
            "title": "워크트리 - 임시 복제된 차원에서 작업하기",
            "seconds": 431,
            "video": true
          },
          {
            "id": "474130",
            "title": "/diff & /review - 변경내역 확인하고 검토하기",
            "seconds": 959,
            "video": true
          },
          {
            "id": "474128",
            "title": "GitHub의 기본 기능과 PR",
            "seconds": 1061,
            "video": true
          },
          {
            "id": "474266",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "473282",
        "title": "코덱스 고급 기능들",
        "units": [
          {
            "id": "475239",
            "title": "서브에이전트 - 일을 나눠 맡는 AI 동료",
            "seconds": 716,
            "video": true
          },
          {
            "id": "476331",
            "title": "👮‍♂️ [개발자용] 서브에이전트 관련 config.toml 설정",
            "seconds": 0,
            "video": false
          },
          {
            "id": "473283",
            "title": "훅(Hooks) - 때맞춰 작동하는 자동화",
            "seconds": 821,
            "video": true
          },
          {
            "id": "474132",
            "title": "Memory로 장기 맥락 관리하기",
            "seconds": 349,
            "video": true
          },
          {
            "id": "477409",
            "title": "🧠 메모리로 설정할 것 vs. AGENTS.md로 설정할 것",
            "seconds": 0,
            "video": false
          },
          {
            "id": "474129",
            "title": "코덱스 클라우드 - AI 팀원들에게 동시에 다른 작업 시키기",
            "seconds": 1262,
            "video": true
          },
          {
            "id": "480068",
            "title": "🌐 사이트(Sites) 레슨이 추가되었습니다.",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "479430",
        "title": "실무 - 국내/미국 주식매매 자동화",
        "units": [
          {
            "id": "479431",
            "title": "실무 프로젝트 소개",
            "seconds": 0,
            "video": false
          },
          {
            "id": "480848",
            "title": "실습준비 - 계좌 개설 & API 키 발급",
            "seconds": 690,
            "video": true
          },
          {
            "id": "481226",
            "title": "전역 지침 설정 & API Docs 스킬 만들기",
            "seconds": 1273,
            "video": true
          },
          {
            "id": "481316",
            "title": "주식매매 MCP & 플러그인 만들기",
            "seconds": 1675,
            "video": true
          },
          {
            "id": "481854",
            "title": "나만의 주식매매 웹페이지 만들기 (기본)",
            "seconds": 1118,
            "video": true
          },
          {
            "id": "482849",
            "title": "🛑 이전 레슨에서 매수/매매 기능이 잘 되지 않을 때 (되더라도 확인!)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "482332",
            "title": "Lightsail에 배포하고 인증 과정 추가하기",
            "seconds": 1322,
            "video": true
          },
          {
            "id": "485574",
            "title": "🛡️ HTTPS 적용하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "482846",
            "title": "클라우드에서 병렬로 기능들 추가하기",
            "seconds": 883,
            "video": true
          },
          {
            "id": "483514",
            "title": "텔레그램으로 알림 받기",
            "seconds": 959,
            "video": true
          },
          {
            "id": "481229",
            "title": "SL/TP, 트레일링 스탑, 데드크로스 전략 구현하기",
            "seconds": 1415,
            "video": true
          },
          {
            "id": "483720",
            "title": "ℹ️ 실투자에 사용을 고려하시는 분들께",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "478956",
        "title": "감사합니다!",
        "units": [
          {
            "id": "482420",
            "title": "🎁 수강평 남기고 선물받기 이벤트! 🎉",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "31": {
    "title": "6주 완성! 백엔드 이력서 차별화 전략 4가지 - 똑같은 이력서 속에서 돋보이는 법",
    "url": "https://www.inflearn.com/course/6%EC%A3%BC%EC%99%84%EC%84%B1-%EB%B0%B1%EC%97%94%EB%93%9C-%EC%9D%B4%EB%A0%A5%EC%84%9C-%EB%8F%8B%EB%B3%B4%EC%9D%B4%EB%8A%94%EB%B2%95",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-03-02 21:51:07",
    "totalSeconds": 80893,
    "totalUnits": 80,
    "sections": [
      {
        "id": "279962",
        "title": "[0주차] 시작하기 앞서서 🏃",
        "units": [
          {
            "id": "279963",
            "title": "0-0. 인트로",
            "seconds": 343,
            "video": true
          },
          {
            "id": "279965",
            "title": "0-1. 백엔드 이력서 수강 전 테스트",
            "seconds": 927,
            "video": true
          },
          {
            "id": "355462",
            "title": "0-2. 대AI 시대에서 개발자는 어떻게 해야 살아남을 수 있을까?",
            "seconds": 772,
            "video": false
          },
          {
            "id": "359222",
            "title": "비전공자 부트캠프 개발자의 현실 - [EP1] 개발자 취업 RPG",
            "seconds": 577,
            "video": false
          }
        ]
      },
      {
        "id": "270387",
        "title": "[1주차] 합격을 부르는 이력서의 구조 📝",
        "units": [
          {
            "id": "283822",
            "title": "수업 교재 링크",
            "seconds": 0,
            "video": false
          },
          {
            "id": "270388",
            "title": "1-1. 오늘 배울 것",
            "seconds": 288,
            "video": true
          },
          {
            "id": "279959",
            "title": "1-2. 요즘 이력서들은 어떤 이력을 원할까?",
            "seconds": 165,
            "video": true
          },
          {
            "id": "279960",
            "title": "1-3. 저는 이력서에 쓸만한 문제가 없는데요",
            "seconds": 290,
            "video": true
          },
          {
            "id": "279961",
            "title": "1-4.어떤 것이 문제 상황인가?",
            "seconds": 468,
            "video": true
          },
          {
            "id": "359223",
            "title": "기술스택이 아쉬워도 신입이력서를 잘 쓰는 법 - [EP2] 개발자 취업 RPG",
            "seconds": 804,
            "video": false
          },
          {
            "id": "291787",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "279969",
        "title": "[2주차] 설득력을 높이는 수치화 기술 📊",
        "units": [
          {
            "id": "279970",
            "title": "2-1. 수치화를 하기 위해서 필요한 사전 지식",
            "seconds": 489,
            "video": true
          },
          {
            "id": "279973",
            "title": "2-2. 모니터링이 뭘까?",
            "seconds": 536,
            "video": true
          },
          {
            "id": "279974",
            "title": "2-3. 현업에서는 어떻게 모니터링을 할까? - 이론편",
            "seconds": 757,
            "video": true
          },
          {
            "id": "279975",
            "title": "2-4. 프로젝트 기본 설정하기 & 로컬 모니터링 인프라 설정",
            "seconds": 1959,
            "video": true
          },
          {
            "id": "279977",
            "title": "2-5. 클라우드 모니터링 - 이론",
            "seconds": 731,
            "video": true
          },
          {
            "id": "279981",
            "title": "2-6. 클라우드 모니터링 - 실습 1",
            "seconds": 891,
            "video": true
          },
          {
            "id": "279982",
            "title": "2-7. 클라우드 모니터링 - 실습 2",
            "seconds": 2322,
            "video": true
          },
          {
            "id": "279984",
            "title": "2-8. 부하테스트 - 이론",
            "seconds": 956,
            "video": true
          },
          {
            "id": "279985",
            "title": "2-9. 부하테스트 - k6 실습",
            "seconds": 936,
            "video": true
          },
          {
            "id": "279986",
            "title": "2-10. 서버 어플리케이션 코드 측정 방법",
            "seconds": 1126,
            "video": true
          },
          {
            "id": "279987",
            "title": "2-11. 그렇다면 어떻게 성능 개선하는건데",
            "seconds": 710,
            "video": true
          },
          {
            "id": "359224",
            "title": "백엔드 개발자라면 필수 소양 모니터링 - [EP3] 개발자 취업 RPG",
            "seconds": 670,
            "video": false
          },
          {
            "id": "291794",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "279968",
        "title": "[3주차] 속도를 지배하는 DB 인덱스 ⚡",
        "units": [
          {
            "id": "279993",
            "title": "3-1. 이번 장을 통해서 얻을 수 있는 이력",
            "seconds": 198,
            "video": true
          },
          {
            "id": "279995",
            "title": "3-2. DB 설정하기",
            "seconds": 669,
            "video": true
          },
          {
            "id": "279996",
            "title": "3-3. 인덱스란?",
            "seconds": 1624,
            "video": true
          },
          {
            "id": "279997",
            "title": "3-4. 인덱스의 심화 이론 - 사전 지식",
            "seconds": 1580,
            "video": true
          },
          {
            "id": "279998",
            "title": "3-5. 인덱스의 심화 이론",
            "seconds": 1726,
            "video": true
          },
          {
            "id": "279999",
            "title": "3-6. 쿼리플랜이란?",
            "seconds": 794,
            "video": true
          },
          {
            "id": "280001",
            "title": "3-7. 쿼리플랜 실제로 파악해보기.",
            "seconds": 1843,
            "video": true
          },
          {
            "id": "280002",
            "title": "3-8. 실제로 이력서에 녹이기 위해서 어떤 게 좋을까?",
            "seconds": 419,
            "video": true
          },
          {
            "id": "280003",
            "title": "3-9. 실제 예시 코드로 작성하기 - 1",
            "seconds": 2415,
            "video": true
          },
          {
            "id": "280005",
            "title": "3-10. 실제 예시 코드로 작성하기 -2",
            "seconds": 1276,
            "video": true
          },
          {
            "id": "359225",
            "title": "신입 개발자가 디비 제대로 알아야하는 이유 - [EP4] 개발자 취업 RPG",
            "seconds": 618,
            "video": false
          },
          {
            "id": "291792",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "279967",
        "title": "[4주차] 꼬임을 막는 트랜잭션과 락 전략 🔒",
        "units": [
          {
            "id": "280012",
            "title": "4-1. 이번 장을 통해서 얻을 수 있는 이력",
            "seconds": 173,
            "video": true
          },
          {
            "id": "280013",
            "title": "4-2. 트랜잭션과 ACID",
            "seconds": 1095,
            "video": true
          },
          {
            "id": "280014",
            "title": "4-3. 그런데, 여러 트랜잭션이 붙으면?",
            "seconds": 569,
            "video": true
          },
          {
            "id": "280015",
            "title": "4-4. 격리성 레벨 학습 및 실습",
            "seconds": 2344,
            "video": true
          },
          {
            "id": "280016",
            "title": "4-5. 근데 이거 어떻게 되는거임? - InnoDB",
            "seconds": 1313,
            "video": true
          },
          {
            "id": "280018",
            "title": "4-6. 트랜잭션 실습 - 쿠폰 동시성 문제 해결",
            "seconds": 1186,
            "video": true
          },
          {
            "id": "280019",
            "title": "4-7. 락이란?",
            "seconds": 2570,
            "video": true
          },
          {
            "id": "280021",
            "title": "4-8. 락 실습 및 데드락 해결하기",
            "seconds": 1930,
            "video": true
          },
          {
            "id": "280022",
            "title": "4-9. 낙관적 락, 비관적 락",
            "seconds": 1563,
            "video": true
          },
          {
            "id": "280023",
            "title": "4-10. 네임드락 구현 및 개선",
            "seconds": 1554,
            "video": true
          },
          {
            "id": "280024",
            "title": "4-11. 실제로 이력서에 녹이기 위해서 어떤 게 좋을까?",
            "seconds": 358,
            "video": true
          },
          {
            "id": "280025",
            "title": "4-12. 실제 예시 코드로 작성하기 - 1",
            "seconds": 2697,
            "video": true
          },
          {
            "id": "280026",
            "title": "4-13. 실제 예시 코드로 작성하기 - 2",
            "seconds": 1469,
            "video": true
          },
          {
            "id": "359226",
            "title": "트랜잭션 없으면 프로그램 망하는 이유 - [EP5] 개발자 취업 RPG",
            "seconds": 687,
            "video": false
          },
          {
            "id": "291796",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "279966",
        "title": "[5주차] 병목을 뚫는 서버 코드 최적화 🧠",
        "units": [
          {
            "id": "280030",
            "title": "5-1. 이번 장을 통해서 얻을 수 있는 이력",
            "seconds": 163,
            "video": true
          },
          {
            "id": "280031",
            "title": "5-2. JPA 와 N+1 문제 - 개념 1",
            "seconds": 382,
            "video": true
          },
          {
            "id": "280032",
            "title": "5-3. JPA 와 N+1 문제 - 개념 2",
            "seconds": 983,
            "video": true
          },
          {
            "id": "280033",
            "title": "5-4. JPA 와 N+1 문제 - 대표적인 사례",
            "seconds": 3086,
            "video": true
          },
          {
            "id": "280034",
            "title": "5-5. JPA 와 N+1 문제 - 이력서",
            "seconds": 1206,
            "video": true
          },
          {
            "id": "280036",
            "title": "5-6. JPA 와 벌크 연산 - 개념",
            "seconds": 376,
            "video": true
          },
          {
            "id": "280037",
            "title": "5-7. JPA 와 벌크 연산 - 대표적인 사례",
            "seconds": 1765,
            "video": true
          },
          {
            "id": "280038",
            "title": "5-8. JPA 와 벌크 연산 - 이력서",
            "seconds": 803,
            "video": true
          },
          {
            "id": "280039",
            "title": "5-9. Stream 과 Filter Overhead - 개념 1",
            "seconds": 1060,
            "video": true
          },
          {
            "id": "280040",
            "title": "5-10. Stream 과 Filter Overhead - 개념 2",
            "seconds": 591,
            "video": true
          },
          {
            "id": "280041",
            "title": "5-11. Stream 과 필터 - 대표적인 사례",
            "seconds": 863,
            "video": true
          },
          {
            "id": "280042",
            "title": "5-12. Stream 과 필터 - 이력서",
            "seconds": 377,
            "video": true
          },
          {
            "id": "280043",
            "title": "5-13. 비동기 처리 - 개념 1",
            "seconds": 1562,
            "video": true
          },
          {
            "id": "280045",
            "title": "5-14. 비동기 처리 - 개념 2",
            "seconds": 1145,
            "video": true
          },
          {
            "id": "280046",
            "title": "5-15. 비동기 처리 - 대표적인 사례",
            "seconds": 1463,
            "video": true
          },
          {
            "id": "280047",
            "title": "5-16. 비동기 처리 - 이력서",
            "seconds": 628,
            "video": true
          },
          {
            "id": "359227",
            "title": "백엔드 개발자들이 신경써야하는 어플리케이션 최적화 - [EP6] 개발자 취업 RPG",
            "seconds": 656,
            "video": false
          },
          {
            "id": "291799",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "280052",
        "title": "[6주차] 부하를 견디는 서버의 비밀, Redis 🚀",
        "units": [
          {
            "id": "280091",
            "title": "6-1. 이번 장을 통해서 얻을 수 있는 이력",
            "seconds": 153,
            "video": true
          },
          {
            "id": "280092",
            "title": "6-2. 캐싱(Caching)의 개념 1",
            "seconds": 679,
            "video": true
          },
          {
            "id": "280968",
            "title": "6-3. 캐싱(Caching)의 개념 2",
            "seconds": 1885,
            "video": true
          },
          {
            "id": "280970",
            "title": "6-4. 캐싱(Caching)의 개념 3",
            "seconds": 2148,
            "video": true
          },
          {
            "id": "280971",
            "title": "6-5. 로컬 캐싱",
            "seconds": 1785,
            "video": true
          },
          {
            "id": "280972",
            "title": "6-6. Remote 캐싱의 필요성",
            "seconds": 767,
            "video": true
          },
          {
            "id": "280973",
            "title": "6-7. Redis 를 이용한 Remote 캐싱",
            "seconds": 743,
            "video": true
          },
          {
            "id": "280974",
            "title": "6-8. Redis 캐싱 적용해보기",
            "seconds": 913,
            "video": true
          },
          {
            "id": "280975",
            "title": "6-9. Redis 캐싱 모니터링 환경 구성",
            "seconds": 635,
            "video": true
          },
          {
            "id": "280976",
            "title": "6-10. 실제로 이력서에 녹이기 위해서 어떤 게 좋을까?",
            "seconds": 303,
            "video": true
          },
          {
            "id": "280977",
            "title": "6-11. Redis 캐싱 시 발생하는 대표 문제 사례와 해결책 1",
            "seconds": 1560,
            "video": true
          },
          {
            "id": "280978",
            "title": "6-12. Redis 캐싱 시 발생하는 대표 문제 사례와 해결책 2",
            "seconds": 870,
            "video": true
          },
          {
            "id": "301560",
            "title": "6-13. Redis 캐싱 시 발생하는 대표 문제 사례와 해결책 3",
            "seconds": 1131,
            "video": true
          },
          {
            "id": "280981",
            "title": "6-15. 강의를 마치며",
            "seconds": 152,
            "video": true
          },
          {
            "id": "284311",
            "title": "🎁 EVENT🎁 수강평 인증하는 방법",
            "seconds": 0,
            "video": false
          },
          {
            "id": "359228",
            "title": "레디스 붙이기만 하면 큰일 난다 - [EP7] 개발자 취업 RPG",
            "seconds": 673,
            "video": false
          }
        ]
      }
    ]
  },
  "27": {
    "title": "AWS로 배우는 네트워크: 이론부터 실무까지",
    "url": "https://www.inflearn.com/course/aws%EB%A1%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%9D%B4%EB%A1%A0%EB%B6%80%ED%84%B0-%EC%8B%A4",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-28 15:03:09",
    "totalSeconds": 54991,
    "totalUnits": 52,
    "sections": [
      {
        "id": "418927",
        "title": "시작에 앞서",
        "units": [
          {
            "id": "418928",
            "title": "강의소개 및 학습목표",
            "seconds": 807,
            "video": true
          },
          {
            "id": "418946",
            "title": "알고 있다고 가정하는 것들",
            "seconds": 843,
            "video": true
          },
          {
            "id": "418947",
            "title": "OSI 7 layer를 대충 넘겨야 하는 이유",
            "seconds": 1084,
            "video": true
          },
          {
            "id": "418948",
            "title": "User/Kernel 모드와 소켓의 본질",
            "seconds": 1454,
            "video": true
          },
          {
            "id": "419000",
            "title": "수업자료 - PDF",
            "seconds": 0,
            "video": false
          },
          {
            "id": "419001",
            "title": "수업자료 - PDF (인쇄용)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "419148",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418949",
        "title": "Internet 기반 네트워크",
        "units": [
          {
            "id": "418950",
            "title": "Host에 대한 이해",
            "seconds": 785,
            "video": true
          },
          {
            "id": "418951",
            "title": "스위치가 하는 일",
            "seconds": 801,
            "video": true
          }
        ]
      },
      {
        "id": "418945",
        "title": "L2 수준에서 출발",
        "units": [
          {
            "id": "418952",
            "title": "NIC, LAN 카드, MAC 주소, Frame",
            "seconds": 1054,
            "video": true
          },
          {
            "id": "418953",
            "title": "L2 스위치에 관한 상식",
            "seconds": 1373,
            "video": true
          },
          {
            "id": "418954",
            "title": "LAN, WAN, Broadcast",
            "seconds": 959,
            "video": true
          }
        ]
      },
      {
        "id": "418955",
        "title": "Internet의 작동원리",
        "units": [
          {
            "id": "418956",
            "title": "IPv4 주소의 구조",
            "seconds": 1627,
            "video": true
          },
          {
            "id": "418957",
            "title": "택배와 닮은 Packet",
            "seconds": 899,
            "video": true
          },
          {
            "id": "418958",
            "title": "계층별 데이터 단위",
            "seconds": 683,
            "video": true
          },
          {
            "id": "419144",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418959",
        "title": "Internet에 대한 더 깊은 이해",
        "units": [
          {
            "id": "418960",
            "title": "IP헤더와 AWS ENI 소개",
            "seconds": 1958,
            "video": true
          },
          {
            "id": "418961",
            "title": "Host 자신을 가리키는 IP주소",
            "seconds": 771,
            "video": true
          },
          {
            "id": "418962",
            "title": "라우터에 대한 최소 이론",
            "seconds": 1115,
            "video": true
          },
          {
            "id": "418963",
            "title": "TTL(Time To Live)과 단편화",
            "seconds": 668,
            "video": true
          },
          {
            "id": "418964",
            "title": "인터넷 설정 자동화",
            "seconds": 756,
            "video": true
          },
          {
            "id": "418965",
            "title": "ARP와 해킹기법",
            "seconds": 1277,
            "video": true
          },
          {
            "id": "418966",
            "title": "Ping과 RTT(Round Trip Time)",
            "seconds": 799,
            "video": true
          },
          {
            "id": "419158",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418967",
        "title": "L4 TCP와 UDP",
        "units": [
          {
            "id": "418968",
            "title": "TCP와 UDP 개요",
            "seconds": 1099,
            "video": true
          },
          {
            "id": "418969",
            "title": "4계층 헤더 구조와 Buffered I/O",
            "seconds": 1562,
            "video": true
          },
          {
            "id": "418970",
            "title": "TCP 세션과 상태 그리고 게임서버",
            "seconds": 976,
            "video": true
          },
          {
            "id": "418971",
            "title": "RST가 발생하는 이유",
            "seconds": 763,
            "video": true
          },
          {
            "id": "418972",
            "title": "연결이라는 착각과 AWS ALB",
            "seconds": 1513,
            "video": true
          },
          {
            "id": "418973",
            "title": "대표적 TCP 장애유형과 서버 오류",
            "seconds": 1000,
            "video": true
          },
          {
            "id": "419150",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418974",
        "title": "웹을 이루는 핵심기술",
        "units": [
          {
            "id": "418975",
            "title": "URI와 URL 그리고 도메인 이름",
            "seconds": 1106,
            "video": true
          },
          {
            "id": "418976",
            "title": "DNS 구조",
            "seconds": 1828,
            "video": true
          },
          {
            "id": "418977",
            "title": "DNS 캐싱과 AWS Route 53 설정 예시",
            "seconds": 1233,
            "video": true
          },
          {
            "id": "418978",
            "title": "HTTP와 REST API",
            "seconds": 1724,
            "video": true
          },
          {
            "id": "419894",
            "title": "모놀리식 웹 서비스 구조",
            "seconds": 3485,
            "video": true
          },
          {
            "id": "419895",
            "title": "웹 보안과 SOP, CORS",
            "seconds": 1579,
            "video": true
          },
          {
            "id": "419897",
            "title": "모던 웹과 JWT",
            "seconds": 1793,
            "video": true
          },
          {
            "id": "419898",
            "title": "모던 웹 서비스 구조",
            "seconds": 1075,
            "video": true
          }
        ]
      },
      {
        "id": "418980",
        "title": "네트워크 장치 구조",
        "units": [
          {
            "id": "418981",
            "title": "세 가지 장치 구조",
            "seconds": 530,
            "video": true
          },
          {
            "id": "418982",
            "title": "Inline 구조와 라우터",
            "seconds": 788,
            "video": true
          },
          {
            "id": "418983",
            "title": "Out of path 구조와 DPI(Deep Packet Inspection)",
            "seconds": 1292,
            "video": true
          },
          {
            "id": "418984",
            "title": "Proxy - 우회",
            "seconds": 741,
            "video": true
          },
          {
            "id": "418985",
            "title": "Proxy - 보호와 감시",
            "seconds": 507,
            "video": true
          },
          {
            "id": "418986",
            "title": "Reverse Proxy와 WAF(Web Application Firewall)",
            "seconds": 669,
            "video": true
          },
          {
            "id": "419161",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418987",
        "title": "NAT(Network Address Translation)와 부하분산",
        "units": [
          {
            "id": "418988",
            "title": "공유기 작동원리",
            "seconds": 958,
            "video": true
          },
          {
            "id": "418989",
            "title": "Symmetric NAT",
            "seconds": 882,
            "video": true
          },
          {
            "id": "418990",
            "title": "AWS VPC와 Gateway endpoint 구성",
            "seconds": 1474,
            "video": true
          },
          {
            "id": "418991",
            "title": "포트 포워딩 설정과 UPnP",
            "seconds": 722,
            "video": true
          },
          {
            "id": "418992",
            "title": "AWS ALB, NLB를 이용한 부하분산",
            "seconds": 1209,
            "video": true
          },
          {
            "id": "418993",
            "title": "대규모 부하분산을 위한 GSLB",
            "seconds": 729,
            "video": true
          },
          {
            "id": "419146",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "418994",
        "title": "네트워크 보안 인프라",
        "units": [
          {
            "id": "418995",
            "title": "사설망과 VPN",
            "seconds": 708,
            "video": true
          },
          {
            "id": "418996",
            "title": "IPSec VPN 터널링",
            "seconds": 879,
            "video": true
          },
          {
            "id": "418997",
            "title": "VPN과 재택근무 (해커를 잡지 못하는 이유)",
            "seconds": 961,
            "video": true
          },
          {
            "id": "418998",
            "title": "네트워크 보안 솔루션",
            "seconds": 946,
            "video": true
          },
          {
            "id": "418999",
            "title": "학습성과 확인 및 수료",
            "seconds": 547,
            "video": true
          },
          {
            "id": "419145",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "1": {
    "title": "빠르게 배우는 Spring Cloud 기초(MSA)",
    "url": "https://www.inflearn.com/course/spring-cloud-%EA%B8%B0%EC%B4%88-msa",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:36:22",
    "totalSeconds": 31735,
    "totalUnits": 16,
    "sections": [
      {
        "id": "261247",
        "title": "개요",
        "units": [
          {
            "id": "261248",
            "title": "수업전반개요",
            "seconds": 1863,
            "video": true
          },
          {
            "id": "276655",
            "title": "모놀리식, msa 개요 및 환경세팅",
            "seconds": 1650,
            "video": true
          },
          {
            "id": "278358",
            "title": "모놀리식 코드 이해",
            "seconds": 2148,
            "video": true
          },
          {
            "id": "293272",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "276648",
        "title": "SPRING CLOUD 핵심요소",
        "units": [
          {
            "id": "278370",
            "title": "msa프로젝트 시작",
            "seconds": 1493,
            "video": true
          },
          {
            "id": "278371",
            "title": "apigateway, eureka 역할",
            "seconds": 1814,
            "video": true
          },
          {
            "id": "278372",
            "title": "apigateway, eureka 서버 구성",
            "seconds": 3606,
            "video": true
          },
          {
            "id": "278662",
            "title": "msa 서비스 모듈 분리",
            "seconds": 2455,
            "video": true
          },
          {
            "id": "293448",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "276650",
        "title": "동기, 비동기 통신",
        "units": [
          {
            "id": "278664",
            "title": "resttemplate을 활용한 동기요청",
            "seconds": 2638,
            "video": true
          },
          {
            "id": "278770",
            "title": "feignclient, kafka 개요",
            "seconds": 2358,
            "video": true
          },
          {
            "id": "280342",
            "title": "openfeign을 통한 동기요청",
            "seconds": 1525,
            "video": true
          },
          {
            "id": "280343",
            "title": "카프카 활용을 위한 bean객체 생성",
            "seconds": 2267,
            "video": true
          },
          {
            "id": "278771",
            "title": "카프카를 활용한 비동기(이벤트기반)요청",
            "seconds": 1077,
            "video": true
          },
          {
            "id": "292979",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "278772",
        "title": "config서버와 circuitbreaker",
        "units": [
          {
            "id": "278773",
            "title": "config 서버 구성",
            "seconds": 1836,
            "video": true
          },
          {
            "id": "278774",
            "title": "spring cloud bus를 통한 실시간 yml정보 갱신",
            "seconds": 2301,
            "video": true
          },
          {
            "id": "278775",
            "title": "circuit breaker 적용",
            "seconds": 2258,
            "video": true
          },
          {
            "id": "281781",
            "title": "마무리",
            "seconds": 446,
            "video": true
          },
          {
            "id": "292565",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "11": {
    "title": "제미니의 개발실무 - 커머스 백엔드 레거시와 AI 활용편",
    "url": "https://www.inflearn.com/course/%EC%A0%9C%EB%AF%B8%EB%8B%88%EC%9D%98-%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%AC%B4-%EB%B0%B1%EC%97%94%EB%93%9C%EB%A0%88%EA%B1%B0%EC%8B%9C-ai%ED%99%9C%EC%9A%A9",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-08 09:37:54",
    "totalSeconds": 32828,
    "totalUnits": 37,
    "sections": [
      {
        "id": "392719",
        "title": "강의 준비",
        "units": [
          {
            "id": "392720",
            "title": "강의 소개",
            "seconds": 426,
            "video": true
          },
          {
            "id": "392723",
            "title": "강의 구성",
            "seconds": 235,
            "video": true
          },
          {
            "id": "392724",
            "title": "상황 정의",
            "seconds": 565,
            "video": true
          },
          {
            "id": "392725",
            "title": "강의 자료 다운로드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "397437",
            "title": "강의 자료의 활용법",
            "seconds": 268,
            "video": true
          },
          {
            "id": "402154",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392727",
        "title": "입사 첫날",
        "units": [
          {
            "id": "392728",
            "title": "입사 첫날 - 레거시 x AI 느끼기",
            "seconds": 2060,
            "video": true
          }
        ]
      },
      {
        "id": "392729",
        "title": "상품 목록",
        "units": [
          {
            "id": "392731",
            "title": "상품 목록 - 요구사항 느끼기",
            "seconds": 999,
            "video": true
          },
          {
            "id": "392732",
            "title": "상품 목록 - 레거시 x AI 느끼기",
            "seconds": 931,
            "video": true
          },
          {
            "id": "392733",
            "title": "상품 목록 - 코드 느끼기",
            "seconds": 815,
            "video": true
          },
          {
            "id": "402155",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392730",
        "title": "상품 상세",
        "units": [
          {
            "id": "392734",
            "title": "상품 상세 - 요구사항 느끼기",
            "seconds": 1068,
            "video": true
          },
          {
            "id": "392735",
            "title": "상품 상세 - 레거시 x AI 느끼기",
            "seconds": 711,
            "video": true
          },
          {
            "id": "392736",
            "title": "상품 상세 - 코드 느끼기",
            "seconds": 545,
            "video": true
          },
          {
            "id": "402153",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392737",
        "title": "리뷰",
        "units": [
          {
            "id": "392782",
            "title": "리뷰 - 요구사항 느끼기",
            "seconds": 398,
            "video": true
          },
          {
            "id": "392783",
            "title": "리뷰 - 레거시 x AI 느끼기",
            "seconds": 2065,
            "video": true
          },
          {
            "id": "392784",
            "title": "리뷰 - 코드 느끼기",
            "seconds": 1445,
            "video": true
          }
        ]
      },
      {
        "id": "392738",
        "title": "찜하기",
        "units": [
          {
            "id": "392785",
            "title": "찜하기 - 요구사항 느끼기",
            "seconds": 362,
            "video": true
          },
          {
            "id": "392786",
            "title": "찜하기 - 레거시 x AI 느끼기",
            "seconds": 2382,
            "video": true
          },
          {
            "id": "392787",
            "title": "찜하기 - 코드 느끼기",
            "seconds": 441,
            "video": true
          }
        ]
      },
      {
        "id": "392739",
        "title": "쿠폰",
        "units": [
          {
            "id": "392788",
            "title": "쿠폰 - 요구사항 느끼기",
            "seconds": 446,
            "video": true
          },
          {
            "id": "392789",
            "title": "쿠폰 - 레거시 x AI 느끼기",
            "seconds": 1744,
            "video": true
          },
          {
            "id": "392790",
            "title": "쿠폰 - 코드 느끼기",
            "seconds": 933,
            "video": true
          },
          {
            "id": "402163",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392740",
        "title": "장바구니",
        "units": [
          {
            "id": "392791",
            "title": "장바구니 - 요구사항 느끼기",
            "seconds": 611,
            "video": true
          },
          {
            "id": "392792",
            "title": "장바구니 - 레거시 x AI 느끼기",
            "seconds": 1441,
            "video": true
          },
          {
            "id": "392794",
            "title": "장바구니 - 코드 느끼기",
            "seconds": 1641,
            "video": true
          }
        ]
      },
      {
        "id": "392741",
        "title": "주문",
        "units": [
          {
            "id": "392795",
            "title": "주문 - 요구사항 느끼기",
            "seconds": 291,
            "video": true
          },
          {
            "id": "392796",
            "title": "주문 - 레거시 x AI 느끼기",
            "seconds": 1367,
            "video": true
          },
          {
            "id": "392797",
            "title": "주문 - 코드 느끼기",
            "seconds": 177,
            "video": true
          },
          {
            "id": "402157",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392742",
        "title": "결제",
        "units": [
          {
            "id": "392798",
            "title": "결제 - 요구사항 느끼기",
            "seconds": 172,
            "video": true
          },
          {
            "id": "392799",
            "title": "결제 - 레거시 x AI 느끼기",
            "seconds": 1022,
            "video": true
          },
          {
            "id": "392800",
            "title": "결제 - 코드 느끼기",
            "seconds": 578,
            "video": true
          },
          {
            "id": "402161",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392743",
        "title": "취소",
        "units": [
          {
            "id": "392802",
            "title": "취소 - 요구사항 느끼기",
            "seconds": 516,
            "video": true
          },
          {
            "id": "392803",
            "title": "취소 - 레거시 x AI 느끼기",
            "seconds": 2315,
            "video": true
          },
          {
            "id": "392805",
            "title": "취소 - 코드 느끼기",
            "seconds": 640,
            "video": true
          },
          {
            "id": "402164",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392744",
        "title": "정산",
        "units": [
          {
            "id": "392806",
            "title": "정산 - 요구사항 느끼기",
            "seconds": 382,
            "video": true
          },
          {
            "id": "392808",
            "title": "정산 - 레거시 x AI 느끼기",
            "seconds": 2048,
            "video": true
          },
          {
            "id": "392809",
            "title": "정산 - 코드 느끼기",
            "seconds": 612,
            "video": true
          },
          {
            "id": "402156",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "392745",
        "title": "마무리",
        "units": [
          {
            "id": "392747",
            "title": "마무리 - AI 시대를 여행하는 여러분들에게",
            "seconds": 176,
            "video": true
          }
        ]
      }
    ]
  },
  "46": {
    "title": "카카오 면접관이 알려주는 수백개의 MSA 서비스 아키텍처에서의 분산 추적 시스템",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%95%8C%EB%A0%A4%EC%A3%BC%EB%8A%94-%EC%88%98%EB%B0%B1%EA%B0%9C%EC%9D%98-m",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-09-28 12:21:39",
    "totalSeconds": 16270,
    "totalUnits": 22,
    "sections": [
      {
        "id": "353446",
        "title": "강의 소개 및 자료",
        "units": [
          {
            "id": "353447",
            "title": "강의 소개",
            "seconds": 866,
            "video": true
          },
          {
            "id": "353478",
            "title": "Source Code [ 빌드 포함 ]",
            "seconds": 0,
            "video": false
          },
          {
            "id": "353480",
            "title": "강의 요약 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "353736",
            "title": "공식 OpenTelemetry Doc",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353488",
        "title": "분산 추적 시스템이 필요한 이유와 분산 추적 데이터",
        "units": [
          {
            "id": "353489",
            "title": "What is Grafana & 구현하고자 하는 아키텍처",
            "seconds": 1104,
            "video": true
          },
          {
            "id": "353490",
            "title": "Grafana & Tempo 아키텍처 연동 원리",
            "seconds": 637,
            "video": true
          },
          {
            "id": "353491",
            "title": "분산 추적 데이터 구조와 시각화 원리",
            "seconds": 915,
            "video": true
          },
          {
            "id": "353492",
            "title": "분산 Tracing 환경에서의 디버깅 상관관계",
            "seconds": 619,
            "video": true
          },
          {
            "id": "355194",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353493",
        "title": "Grafana의 분산 추적 시스템 Tempo",
        "units": [
          {
            "id": "353494",
            "title": "Grafana Tempo 개요와 설계 철학",
            "seconds": 443,
            "video": true
          },
          {
            "id": "353495",
            "title": "Grafana Tempo 마이크로서비스 아키텍처",
            "seconds": 749,
            "video": true
          },
          {
            "id": "353496",
            "title": "Tempo 블록 기반 저장 메커니즘",
            "seconds": 1006,
            "video": true
          },
          {
            "id": "353497",
            "title": "Tempo 쿼리 처리와 성능 최적화",
            "seconds": 843,
            "video": true
          },
          {
            "id": "355193",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353498",
        "title": "MSA 아키텍처에서의 서비스 관계 OpenTelemetry Collector의 모든 것",
        "units": [
          {
            "id": "353499",
            "title": "OpenTelemetry Collector 개념과 역할",
            "seconds": 795,
            "video": true
          },
          {
            "id": "353500",
            "title": "OpenTelemetry Collector 아키텍처와 컴포넌트",
            "seconds": 1017,
            "video": true
          },
          {
            "id": "353501",
            "title": "OpenTelemetry Receiver 심화 분석",
            "seconds": 879,
            "video": true
          },
          {
            "id": "353502",
            "title": "OpenTelemetry Processor 심화 분석",
            "seconds": 819,
            "video": true
          },
          {
            "id": "353503",
            "title": "OpenTelemetry Exporter 심화 분석",
            "seconds": 780,
            "video": true
          },
          {
            "id": "353504",
            "title": "OpenTelemetry Collector 성능 최적화와 확장성",
            "seconds": 715,
            "video": true
          },
          {
            "id": "355195",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353505",
        "title": "경량화된 환경 구축 및 최종 실습 진행하기",
        "units": [
          {
            "id": "353506",
            "title": "Grafana, Otel, Tempo 앞서 배운 컴포넌트 설정 파일 구성하기",
            "seconds": 1530,
            "video": true
          },
          {
            "id": "353507",
            "title": "Docker 및 Volume Mount를 활용한 경량화된 환경 구축하기",
            "seconds": 1286,
            "video": true
          },
          {
            "id": "353508",
            "title": "간략화된 MSA 아키텍처를 위한 3개의 서버",
            "seconds": 651,
            "video": true
          },
          {
            "id": "353509",
            "title": "Grafana & TraceQL 작성하며 확인하는 분산 추적 데이터",
            "seconds": 616,
            "video": true
          },
          {
            "id": "355199",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "2": {
    "title": "스프링부트로 직접 만들면서 배우는 대규모 시스템 설계 - 캐시 전략",
    "url": "https://www.inflearn.com/course/spring-boot-hands-on",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-11-05 09:00:00",
    "totalSeconds": 27621,
    "totalUnits": 44,
    "sections": [
      {
        "id": "362614",
        "title": "들어가며",
        "units": [
          {
            "id": "362618",
            "title": "강의소개",
            "seconds": 188,
            "video": true
          },
          {
            "id": "362665",
            "title": "강의자료 다운로드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "362617",
            "title": "캐시",
            "seconds": 434,
            "video": true
          },
          {
            "id": "362619",
            "title": "Redis",
            "seconds": 422,
            "video": true
          },
          {
            "id": "362620",
            "title": "Docker",
            "seconds": 180,
            "video": true
          },
          {
            "id": "364025",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "362621",
        "title": "개발 환경 세팅",
        "units": [
          {
            "id": "362622",
            "title": "Docker를 이용한 Redis 환경 세팅&실습",
            "seconds": 198,
            "video": true
          },
          {
            "id": "362628",
            "title": "Spring Boot 프로젝트 생성 (1)",
            "seconds": 1502,
            "video": true
          },
          {
            "id": "362626",
            "title": "Spring Boot 프로젝트 생성 (2)",
            "seconds": 1650,
            "video": true
          },
          {
            "id": "362623",
            "title": "Spring Boot 프로젝트 생성 (3)",
            "seconds": 1138,
            "video": true
          },
          {
            "id": "362627",
            "title": "스프링의 캐시 애노테이션",
            "seconds": 157,
            "video": true
          },
          {
            "id": "362625",
            "title": "스프링의 캐시 애노테이션 - 구현",
            "seconds": 978,
            "video": true
          },
          {
            "id": "362624",
            "title": "스프링의 캐시 애노테이션 - 다음으로",
            "seconds": 30,
            "video": true
          },
          {
            "id": "364029",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "362629",
        "title": "Cache Penetration",
        "units": [
          {
            "id": "362644",
            "title": "Cache Penetration",
            "seconds": 264,
            "video": true
          },
          {
            "id": "362640",
            "title": "Null Object Pattern",
            "seconds": 151,
            "video": true
          },
          {
            "id": "362639",
            "title": "Null Object Pattern - 구현",
            "seconds": 329,
            "video": true
          },
          {
            "id": "362642",
            "title": "Bloom Filter",
            "seconds": 718,
            "video": true
          },
          {
            "id": "362641",
            "title": "Bloom Filter - 구현 (1)",
            "seconds": 807,
            "video": true
          },
          {
            "id": "362636",
            "title": "Bloom Filter - 구현 (2)",
            "seconds": 985,
            "video": true
          },
          {
            "id": "362638",
            "title": "Bloom Filter - 구현 (3)",
            "seconds": 354,
            "video": true
          },
          {
            "id": "362632",
            "title": "Bloom Filter - 한계",
            "seconds": 283,
            "video": true
          },
          {
            "id": "362634",
            "title": "Bloom Filter - Split",
            "seconds": 164,
            "video": true
          },
          {
            "id": "362633",
            "title": "Bloom Filter - Split - 구현",
            "seconds": 1624,
            "video": true
          },
          {
            "id": "362635",
            "title": "Bloom Filter - Sharding",
            "seconds": 467,
            "video": true
          },
          {
            "id": "362631",
            "title": "Bloom Filter - Sharding - 구현",
            "seconds": 1076,
            "video": true
          },
          {
            "id": "362637",
            "title": "Bloom Filter - Sub Filter",
            "seconds": 459,
            "video": true
          },
          {
            "id": "362630",
            "title": "Bloom Filter - Sub Filter - 구현",
            "seconds": 3074,
            "video": true
          },
          {
            "id": "362643",
            "title": "Bloom Filter - 마무리",
            "seconds": 106,
            "video": true
          },
          {
            "id": "364028",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "362645",
        "title": "Cache Stampede",
        "units": [
          {
            "id": "362657",
            "title": "Cache Stampede",
            "seconds": 147,
            "video": true
          },
          {
            "id": "362656",
            "title": "Jitter",
            "seconds": 148,
            "video": true
          },
          {
            "id": "362652",
            "title": "Jitter - 구현",
            "seconds": 1124,
            "video": true
          },
          {
            "id": "362649",
            "title": "Probabilistic Early Recomputation",
            "seconds": 377,
            "video": true
          },
          {
            "id": "362647",
            "title": "Probabilistic Early Recomputation - 구현",
            "seconds": 1134,
            "video": true
          },
          {
            "id": "362653",
            "title": "Request Collapsing",
            "seconds": 177,
            "video": true
          },
          {
            "id": "362651",
            "title": "Request Collapsing - 구현",
            "seconds": 1154,
            "video": true
          },
          {
            "id": "362655",
            "title": "Request Collapsing - 추가 전략",
            "seconds": 143,
            "video": true
          },
          {
            "id": "362654",
            "title": "Rate Limit",
            "seconds": 285,
            "video": true
          },
          {
            "id": "362648",
            "title": "Rate Limit - 구현",
            "seconds": 687,
            "video": true
          },
          {
            "id": "362650",
            "title": "Write Through",
            "seconds": 555,
            "video": true
          },
          {
            "id": "362646",
            "title": "Write Through - 구현",
            "seconds": 1688,
            "video": true
          },
          {
            "id": "364026",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "362658",
        "title": "Hot Key",
        "units": [
          {
            "id": "362661",
            "title": "Hot Key",
            "seconds": 133,
            "video": true
          },
          {
            "id": "362659",
            "title": "Application Level Sharding/Replication",
            "seconds": 129,
            "video": true
          },
          {
            "id": "362660",
            "title": "Application Level Sharding/Replication - 구현",
            "seconds": 1051,
            "video": true
          },
          {
            "id": "364027",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "362662",
        "title": "마치며",
        "units": [
          {
            "id": "362663",
            "title": "마치며",
            "seconds": 50,
            "video": true
          }
        ]
      },
      {
        "id": "362666",
        "title": "부록",
        "units": [
          {
            "id": "362667",
            "title": "Distributed Relational Database",
            "seconds": 901,
            "video": true
          }
        ]
      }
    ]
  },
  "28": {
    "title": "Claude Code로 만드는 1인 개발자 자동화 시스템 - Sidabari 프로젝트",
    "url": "https://www.inflearn.com/course/solo-developer-autom",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-07-21 11:16:22",
    "totalSeconds": 35855,
    "totalUnits": 14,
    "sections": [
      {
        "id": "445462",
        "title": "2026년 5월 11일 - 1일차: 배경기술 및 설계 프롬프트 소개",
        "units": [
          {
            "id": "445465",
            "title": "시작 전 잡담",
            "seconds": 922,
            "video": true
          },
          {
            "id": "445466",
            "title": "1교시: 알고 있었던 기술배경(OS이론, IPC, COM)과 전혀 몰랐던 Tauri",
            "seconds": 2742,
            "video": true
          },
          {
            "id": "445467",
            "title": "2교시: 진짜 Live 바이브 코딩! WinMux 개발 및 Sidabari 설계 프롬프트 해설#1",
            "seconds": 4728,
            "video": true
          },
          {
            "id": "445468",
            "title": "3교시: Sidabari 설계 프롬프트 해설#2 (22:10 - 치트키 한 문장)",
            "seconds": 2297,
            "video": true
          },
          {
            "id": "445512",
            "title": "강의자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "451114",
            "title": "강의자료 - 인쇄용",
            "seconds": 0,
            "video": false
          },
          {
            "id": "445783",
            "title": "강의자료 - 전체 프롬프트 및 뷰어",
            "seconds": 0,
            "video": false
          },
          {
            "id": "445537",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "445464",
        "title": "2026년 5월 12일 - 2일차: 프롬프트 해설 및 Claude Code 사용방법",
        "units": [
          {
            "id": "445469",
            "title": "1교시: Sidabari 구현 프롬프트 해설",
            "seconds": 3648,
            "video": true
          },
          {
            "id": "445470",
            "title": "2교시: Claude Code 사용방법 #1",
            "seconds": 3338,
            "video": true
          },
          {
            "id": "445471",
            "title": "3교시: Claude Code 사용방법 #2",
            "seconds": 3263,
            "video": true
          },
          {
            "id": "445538",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "445477",
        "title": "2026년 5월 13일 - 3일차: Claude Code의 내부 구조 분석",
        "units": [
          {
            "id": "445472",
            "title": "1교시: (유출된 소스코드 기반) Claude Code의 내부 구조 소개",
            "seconds": 3763,
            "video": true
          },
          {
            "id": "445473",
            "title": "2교시: (※매우 중요) Agenic AI의 근본적 한계를 고려한 프롬프트 작성요령",
            "seconds": 3574,
            "video": true
          },
          {
            "id": "445474",
            "title": "3교시: 유명인사들이 Agentic AI를 사용하는 방법",
            "seconds": 2770,
            "video": true
          },
          {
            "id": "445539",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "445476",
        "title": "2026년 5월 14일 - 1일차: WinMux 프롬프트 공개",
        "units": [
          {
            "id": "445504",
            "title": "WinMux 설계 프롬프트 전체 해설 및 완료",
            "seconds": 4810,
            "video": true
          }
        ]
      }
    ]
  },
  "12": {
    "title": "카카오 면접관과 함께하는 워크플로우 기반의 대용량 트래픽 처리 기법",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C%EC%9A%B0",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-09-07 11:26:23",
    "totalSeconds": 17511,
    "totalUnits": 27,
    "sections": [
      {
        "id": "340400",
        "title": "강의 소개",
        "units": [
          {
            "id": "340401",
            "title": "강의 소개",
            "seconds": 433,
            "video": true
          },
          {
            "id": "347324",
            "title": "강의 수강 전 참고사항 (이벤트 설명 포함)",
            "seconds": 363,
            "video": true
          },
          {
            "id": "347325",
            "title": "Source Code",
            "seconds": 0,
            "video": false
          },
          {
            "id": "347327",
            "title": "강의 내용 요약본",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "347330",
        "title": "강의에서 다루는 전반적인 서비스들",
        "units": [
          {
            "id": "347331",
            "title": "현대적인 EDA 기반의 실시간 아키텍처",
            "seconds": 630,
            "video": true
          },
          {
            "id": "347332",
            "title": "Kafka + Debezium을 활용한 CDC 활용 패턴",
            "seconds": 321,
            "video": true
          },
          {
            "id": "347333",
            "title": "Temporal을 활용한 워커플로우 패턴",
            "seconds": 433,
            "video": true
          },
          {
            "id": "347435",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "347334",
        "title": "Docker와 VM 그 너머의 환경 구축까지",
        "units": [
          {
            "id": "347335",
            "title": "Docker와 경량 이미지를 활용한 환경 구축",
            "seconds": 1238,
            "video": true
          },
          {
            "id": "347336",
            "title": "Docker와 VM의 차이와 그 내부에 대해서",
            "seconds": 868,
            "video": true
          }
        ]
      },
      {
        "id": "347337",
        "title": "서비스 개발자를 위한 Kafka Deep Dive",
        "units": [
          {
            "id": "347338",
            "title": "서비스 개발자를 위한 Kafka 쉽고 깊게 알기 [ 핵심 개념 Deep Dive ]",
            "seconds": 1111,
            "video": true
          },
          {
            "id": "347339",
            "title": "서비스 개발자를 위한 Kafka의 핵심 작업자 Producer & Consumer",
            "seconds": 1023,
            "video": true
          },
          {
            "id": "347340",
            "title": "Kafka에서의 메시지 Delivery Guarantee",
            "seconds": 445,
            "video": true
          },
          {
            "id": "347436",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "347341",
        "title": "실시간 처리를 위한 CDC ( Change Data Capture )는 무엇일까??",
        "units": [
          {
            "id": "347342",
            "title": "실시간 동기화의 핵심 CDC 기본 개념과 필요성",
            "seconds": 733,
            "video": true
          },
          {
            "id": "347343",
            "title": "MySQL Binary Log 기반의 CDC는 왜 효과적일까",
            "seconds": 598,
            "video": true
          },
          {
            "id": "347344",
            "title": "Binary Log 기반의 CDC 구현 플랫폼 Debezium의 개념과 핵심 기능",
            "seconds": 466,
            "video": true
          },
          {
            "id": "347345",
            "title": "Debezium Architecture와 동작 원리",
            "seconds": 388,
            "video": true
          },
          {
            "id": "347346",
            "title": "Debezium의 Best Practice Architecture & 주의점",
            "seconds": 658,
            "video": true
          },
          {
            "id": "347434",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "347347",
        "title": "MSA Architecture에서의 폭증하는 트래픽 처리 및 안전성을 위한 워크플로우",
        "units": [
          {
            "id": "347348",
            "title": "폭증하는 트래픽을 처리하고 안정적인 운영환경을 위한 Workflow",
            "seconds": 641,
            "video": true
          },
          {
            "id": "347349",
            "title": "Temporal의 핵심 개념 Workflow와 Activity",
            "seconds": 468,
            "video": true
          }
        ]
      },
      {
        "id": "347350",
        "title": "Kotlin & Spring Boot를 활용하여 구성하는 Project",
        "units": [
          {
            "id": "347351",
            "title": "Kotlin & Spring Boot를 사용하기 위한 빌드 구성",
            "seconds": 733,
            "video": true
          },
          {
            "id": "347352",
            "title": "Spring Boot를 통해 구현하는 Kafka Config 가이드",
            "seconds": 823,
            "video": true
          },
          {
            "id": "347353",
            "title": "Spring Boot를 통해 구현하는 Temporal Config 가이드",
            "seconds": 561,
            "video": true
          },
          {
            "id": "347354",
            "title": "Temporal 오케스트레이션의 핵심개념 Activity, Workflow 구성하기",
            "seconds": 1610,
            "video": true
          },
          {
            "id": "347355",
            "title": "Kafka ConsumerListener를 활용한 이벤트 처리",
            "seconds": 841,
            "video": true
          },
          {
            "id": "347437",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "347356",
        "title": "테스트 과정",
        "units": [
          {
            "id": "347357",
            "title": "MySQL 테이블 생성과 Debezium을 활용한 Kafka Connector",
            "seconds": 763,
            "video": true
          },
          {
            "id": "347358",
            "title": "Application을 실행하며 MSA환경의 대표적인 EDA, CDC기반의 Architecture 실습하기",
            "seconds": 719,
            "video": true
          }
        ]
      },
      {
        "id": "347359",
        "title": "오로지 수강생분들만을 위한 추가적인 섹션들",
        "units": [
          {
            "id": "347360",
            "title": "오로지 수강생분들만을 위한 Temporal & Docker의 Debugging",
            "seconds": 644,
            "video": true
          }
        ]
      }
    ]
  },
  "45": {
    "title": "카카오 면접관이 알려주는 MSA 관점에서의 분산 트랜잭션 패턴",
    "url": "https://www.inflearn.com/course/distributed-transact",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-10-27 21:38:40",
    "totalSeconds": 18178,
    "totalUnits": 24,
    "sections": [
      {
        "id": "359357",
        "title": "강의 소개",
        "units": [
          {
            "id": "359358",
            "title": "강의 소개",
            "seconds": 440,
            "video": true
          },
          {
            "id": "361141",
            "title": "스켈레톤 실습 코드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361142",
            "title": "완성본에 대한 실습 코드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361259",
            "title": "강의 정리 파일",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361260",
            "title": "같이보면 좋은 자료",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361137",
        "title": "분산 트랜잭션의 문제와 한계 & MSA 관점에서의 ACID의 한계 그에따른 분산 트랜잭션 패턴",
        "units": [
          {
            "id": "361125",
            "title": "SAGA 패턴은 어떤 문제를 해결 할 수 있을까",
            "seconds": 610,
            "video": true
          },
          {
            "id": "361131",
            "title": "대체 왜 분산 트랜잭션이 문제가 있을까",
            "seconds": 708,
            "video": true
          },
          {
            "id": "361121",
            "title": "현대적 분산 트랜잭션에서 SAGA를 구현하는데에 있어 알아야하는 핵심 개념",
            "seconds": 520,
            "video": true
          },
          {
            "id": "361136",
            "title": "현대적인 SAGA 패턴 vs 전통의 ACID`",
            "seconds": 768,
            "video": true
          },
          {
            "id": "361126",
            "title": "SAGA 패턴의 장단점과 적합한 상황 시나리오",
            "seconds": 872,
            "video": true
          },
          {
            "id": "361609",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361138",
        "title": "SAGA의 대표적인 구현체 (Choreography vs Orchestration)",
        "units": [
          {
            "id": "361127",
            "title": "SAGA 패턴의 첫번쨰 독립적인 Choreography 성공과 실패 그에따른 고려점",
            "seconds": 1332,
            "video": true
          },
          {
            "id": "361122",
            "title": "SAGA 패턴 공화제 독립적인 Choreography의 장단점",
            "seconds": 1665,
            "video": true
          },
          {
            "id": "361132",
            "title": "SAGA 패턴 군주제  중앙 집중식 Orchestration",
            "seconds": 1105,
            "video": true
          },
          {
            "id": "361124",
            "title": "SAGA 패턴 군주제 중앙 집중식 Orchestration 장단점",
            "seconds": 1715,
            "video": true
          },
          {
            "id": "361129",
            "title": "Choreography vs Orchestration 패턴 상세비교",
            "seconds": 805,
            "video": true
          },
          {
            "id": "361614",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361140",
        "title": "SAGA와는 다른 장단점을 가지고 있는 분산 트랜잭션 기법",
        "units": [
          {
            "id": "361128",
            "title": "SAGA의 Rollback vs Compensation",
            "seconds": 1093,
            "video": true
          },
          {
            "id": "361133",
            "title": "TCC (Try-Confirm-Cancel) 패턴과 그에따른 실제 MySQL 디자인 설계",
            "seconds": 927,
            "video": true
          },
          {
            "id": "361135",
            "title": "3PC (Three-Phase Commit) 비교",
            "seconds": 489,
            "video": true
          },
          {
            "id": "361612",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361119",
        "title": "SAGA의 실습 준비 및 환경 구성하기",
        "units": [
          {
            "id": "361134",
            "title": "전자 결제 예시를 통한 실습할 아키텍처 및 구현체에 대한 전반적인 설명",
            "seconds": 506,
            "video": true
          },
          {
            "id": "361120",
            "title": "docker-compose를 활용한 경량화된 환경 구축 및 아키텍처",
            "seconds": 794,
            "video": true
          },
          {
            "id": "361130",
            "title": "MSA 관점에서의 Common 모듈의 필요성과 목적",
            "seconds": 438,
            "video": true
          },
          {
            "id": "361613",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361143",
        "title": "SAGA의 실습 진행하기 (Choreography vs Orchestration)",
        "units": [
          {
            "id": "361123",
            "title": "모든 요청의 출입구이자 탈출구 역할을 수행하는 첫번쨰 애플리케이션",
            "seconds": 1820,
            "video": true
          },
          {
            "id": "361536",
            "title": "중간 단계의 처리를 수행하는 두번쨰 애플리케이션",
            "seconds": 696,
            "video": true
          },
          {
            "id": "361537",
            "title": "유실이 허용되는 마지막 애플리케이션 및 테스트",
            "seconds": 875,
            "video": true
          },
          {
            "id": "361610",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ],
    "inflearnId": 339298,
    "dashboardUrl": "https://demo-sub.inflearn.com/course/카카오-면접관개발자이-알려주는-msa/dashboard?cid=339298"
  },
  "32": {
    "title": "The 10x AI-Native Developer: 회사에서 AI로 압도적 성과를 내는 법",
    "url": "https://www.inflearn.com/course/the-10x-ai-native-de",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-05-17 23:48:39",
    "totalSeconds": 55571,
    "totalUnits": 50,
    "sections": [
      {
        "id": "348064",
        "title": "[1주차] AI를 '코딩 비서'에서 '개발 파트너'로",
        "units": [
          {
            "id": "348065",
            "title": "0. 인트로",
            "seconds": 295,
            "video": true
          },
          {
            "id": "353448",
            "title": "수업 교재 링크",
            "seconds": 0,
            "video": false
          },
          {
            "id": "353449",
            "title": "1-1. ✨ 새로운 시대의 서막, AI 네이티브 개발자로의 진화",
            "seconds": 1816,
            "video": true
          },
          {
            "id": "353450",
            "title": "1-2. ⚔️ AI 개발 도구 대전: 무엇을 선택할 것인가?",
            "seconds": 1159,
            "video": true
          },
          {
            "id": "353451",
            "title": "1-3. 🖥️ AI 개발 환경 구축: Claude 기본 설치 및 첫 사용법",
            "seconds": 1113,
            "video": true
          },
          {
            "id": "353452",
            "title": "1-4. 🧠 컨텍스트 관리 마스터하기: AI의 두뇌에 청사진 새겨넣기",
            "seconds": 1947,
            "video": true
          },
          {
            "id": "353453",
            "title": "1-5. 🪄 AI를 지휘하는 언어: 기본 명령어 및 프롬프트 엔지니어링",
            "seconds": 998,
            "video": true
          },
          {
            "id": "353454",
            "title": "1-6. 📜 AI 주니어 개발자 온보딩: 헌법과 업무 지시서",
            "seconds": 1829,
            "video": true
          },
          {
            "id": "353455",
            "title": "1-7. 🛡️ AI에게 '자율 규칙'을 부여하다: Claude Hooks",
            "seconds": 1829,
            "video": true
          },
          {
            "id": "353456",
            "title": "1-8. 🦉 AI의 시야를 넓혀주기: '지능형 컨텍스트 주입' Hook",
            "seconds": 692,
            "video": true
          },
          {
            "id": "439109",
            "title": "1-9. [2026.04] 🚀 2026 Claude Code 2.0 주요 업데이트 기능 안내",
            "seconds": 1615,
            "video": true
          },
          {
            "id": "439110",
            "title": "1-10. [보너스 강의] 🧩 Skills & Plugins: Claude에게 일하는 방법을 가르치기",
            "seconds": 1220,
            "video": true
          },
          {
            "id": "439113",
            "title": "1-11. [2026.04] 🔄 Ralph Loop: \"진짜 끝난 거 맞아?\" 자동 검증 루프 만들기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "355228",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353457",
        "title": "[2주차] AI에게 손과 발을 - MCP를 활용한 외부 도구 연동과 자동화",
        "units": [
          {
            "id": "353458",
            "title": "2-1. 🔌 AI의 감각 확장: MCP 설정 및 핵심 MCP 추천",
            "seconds": 2337,
            "video": true
          },
          {
            "id": "353459",
            "title": "2-2. 🐙 AI를 'Git 마스터'로 만들기: gh CLI 협업 자동화",
            "seconds": 1825,
            "video": true
          },
          {
            "id": "353460",
            "title": "2-3. 📋 AI를 '프로젝트 매니저'로: Jira MCP 스마트 태스크 관리",
            "seconds": 995,
            "video": true
          },
          {
            "id": "353461",
            "title": "2-4. 🦸 AI '어벤져스 팀' 구성하기: Sub-agents를 활용한 병렬 작업",
            "seconds": 1464,
            "video": true
          },
          {
            "id": "353462",
            "title": "2-5. 🕹️ AI '멀티태스킹'의 시대: claude-squad로 여러 AI 동시 관리하기",
            "seconds": 1358,
            "video": true
          },
          {
            "id": "353463",
            "title": "2-6. 🧪 AI QA 엔지니어 고용하기: Playwright MCP를 활용한 E2E 테스트 자동화",
            "seconds": 1085,
            "video": true
          },
          {
            "id": "353464",
            "title": "2-7. 🕸️ AI 웹 스크레이퍼 조종하기: Puppeteer MCP로 데이터 수집 자동화",
            "seconds": 1360,
            "video": true
          },
          {
            "id": "353465",
            "title": "2-8. 🚀 AI '드림팀' 생태계 구축: SuperClaude와 Claude Code Templates",
            "seconds": 1629,
            "video": true
          },
          {
            "id": "353466",
            "title": "2-9. 🤝 AI와 함께하는 오픈소스 기여: 10배 쉬운 컨트리뷰션",
            "seconds": 1762,
            "video": true
          },
          {
            "id": "439111",
            "title": "2-10. [2026.04] 🧬 Claude Code의 진화: 에이전트 시대의 시작",
            "seconds": 1552,
            "video": true
          },
          {
            "id": "439114",
            "title": "2-11. [2026.04] 🏇 하네스 엔지니어링: AI 에이전트에게 '마구'를 채우는 법",
            "seconds": 0,
            "video": false
          },
          {
            "id": "355227",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "353468",
        "title": "[3주차] AI, 24시간 일하는 시스템 엔지니어로 - DevOps, 배포, 모니터링 자동화",
        "units": [
          {
            "id": "353469",
            "title": "3-1. 🤖 24시간 일하는 AI 코드 리뷰어 고용하기: GitHub Actions와 CodeRabbit",
            "seconds": 2081,
            "video": true
          },
          {
            "id": "353470",
            "title": "3-2. 🏗️ AI DevOps의 시대: '인프라를 코드로' 자동 관리하기",
            "seconds": 1674,
            "video": true
          },
          {
            "id": "353471",
            "title": "3-3. 🛠️ IaC, Terraform으로 AWS 인프라 구축의 기초",
            "seconds": 1346,
            "video": true
          },
          {
            "id": "353472",
            "title": "3-4. 🚀 Terraform 실습: 로컬 환경 구성 및 AWS 인프라 배포",
            "seconds": 3211,
            "video": true
          },
          {
            "id": "353473",
            "title": "3-5. 🩺 AI DevOps: 인프라의 확장과 진단 자동화",
            "seconds": 970,
            "video": true
          },
          {
            "id": "353474",
            "title": "3-6. 👁️ AI에게 '시스템의 눈'을 달아주기: 인프라 모니터링 MCP 연동",
            "seconds": 1990,
            "video": true
          },
          {
            "id": "353475",
            "title": "3-7. 🧠 AI의 '두뇌'를 들여다보기: Langfuse를 활용한 LLM 성능 및 품질 모니터링",
            "seconds": 1027,
            "video": true
          },
          {
            "id": "353476",
            "title": "3-8. 🤔 '생각하는 AI'의 탄생: LangChain Agent",
            "seconds": 1852,
            "video": true
          }
        ]
      },
      {
        "id": "353467",
        "title": "[4주차] 아이디어에서 실제 서비스까지, AI 네이티브 프로덕트 완주하기",
        "units": [
          {
            "id": "353477",
            "title": "4-1. ✏️ AI와 함께 서비스 청사진 그리기: MVP 기획",
            "seconds": 1217,
            "video": true
          },
          {
            "id": "353479",
            "title": "4-2. 📋 AI PM, 프로젝트를 설계하다: PRD와 Jira 자동화",
            "seconds": 1195,
            "video": true
          },
          {
            "id": "353481",
            "title": "4-3. 🏗️ 개발의 첫 삽을 뜨다: 프로젝트 환경 구축",
            "seconds": 1964,
            "video": true
          },
          {
            "id": "353482",
            "title": "4-4. 🦸 AI 어벤져스, 병렬 개발 착수: 스프린트 시작",
            "seconds": 1448,
            "video": true
          },
          {
            "id": "353483",
            "title": "4-5. 🌐 AI에게 세상을 가르치다: 실세계 데이터 수집과 정제",
            "seconds": 1145,
            "video": true
          },
          {
            "id": "353484",
            "title": "4-6. 🚀 원클릭 배포: Full Stack CI/CD 파이프라인 자동화",
            "seconds": 2081,
            "video": true
          },
          {
            "id": "353485",
            "title": "4-7. 📡 24시간 관제실: 서비스 모니터링 및 AI 성능 분석",
            "seconds": 1641,
            "video": true
          },
          {
            "id": "353486",
            "title": "4-8. 🏁 미션 완료: 프로젝트 회고와 살아있는 문서 자동화",
            "seconds": 849,
            "video": true
          },
          {
            "id": "353749",
            "title": "🎁 EVENT🎁 수강평 인증하는 방법",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "361546",
        "title": "AI 최신 추가 영상",
        "units": [
          {
            "id": "361547",
            "title": "Claude Sonnet 4.5 한 번 찍먹해보겠습니다",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361548",
            "title": "AI Agent 그래서 뭐 써야 되냐",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361549",
            "title": "OpenAi Agent Builder 가 그래서 뭔데요?",
            "seconds": 0,
            "video": false
          },
          {
            "id": "364539",
            "title": "클로드는 죄가 없다",
            "seconds": 0,
            "video": false
          },
          {
            "id": "364540",
            "title": "AI 코딩 그렇게 하는 거 아닌데 - 켄트 백 (40년차)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "420901",
            "title": "개발자 잡일, 이제 AI가 다 합니다 Claude Code + Jira",
            "seconds": 0,
            "video": false
          },
          {
            "id": "420902",
            "title": "인프라 몰라도 AI가 AWS 배포 다 해줌 Terraform + Claude Code",
            "seconds": 0,
            "video": false
          },
          {
            "id": "420903",
            "title": "클로드가 알아서 테스트하고 수정하게 만드는 방법 | Ralph Loop",
            "seconds": 0,
            "video": false
          },
          {
            "id": "420904",
            "title": "앤트로픽이 오픈클로 킬러 피처를 하루에 2개 복사했습니다",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "24": {
    "title": "비전공자도 이해할 수 있는 MSA 입문/실전 (feat. Spring Boot)",
    "url": "https://www.inflearn.com/course/%EB%B9%84%EC%A0%84%EA%B3%B5%EC%9E%90%EB%8F%84-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-msa-%EC%9E%85",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-30 20:26:37",
    "totalSeconds": 20718,
    "totalUnits": 68,
    "sections": [
      {
        "id": "349921",
        "title": "꼭!꼭! 들어봐야 하는 오리엔테이션 🦆",
        "units": [
          {
            "id": "349922",
            "title": "강의 소개",
            "seconds": 150,
            "video": true
          },
          {
            "id": "350004",
            "title": "소통하면서 듣는 인터넷 강의?!",
            "seconds": 111,
            "video": true
          },
          {
            "id": "350005",
            "title": "[학습 Tip] 강의를 다 듣고나서 스스로 구현할 수 있으려면?",
            "seconds": 197,
            "video": true
          },
          {
            "id": "412629",
            "title": "[공지] 강의 자료 저작권 관련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "350006",
            "title": "[학습 Tip] 파레토의 법칙",
            "seconds": 118,
            "video": true
          },
          {
            "id": "350007",
            "title": "[학습 Tip] First Word 법칙",
            "seconds": 77,
            "video": true
          },
          {
            "id": "350008",
            "title": "[학습 Tip] 주석 공부법",
            "seconds": 138,
            "video": true
          },
          {
            "id": "350009",
            "title": "1:1 오픈 톡방(질문) / 마음의 소리함",
            "seconds": 0,
            "video": false
          },
          {
            "id": "350010",
            "title": "수업 자료 (Notion)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "351261",
            "title": "수업 자료 (PDF)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "351313",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350011",
        "title": "MSA 기본 개념",
        "units": [
          {
            "id": "350012",
            "title": "MSA를 왜 배워야할까?",
            "seconds": 191,
            "video": true
          },
          {
            "id": "350013",
            "title": "MSA(Microservice Architecture)란?",
            "seconds": 230,
            "video": true
          },
          {
            "id": "350014",
            "title": "MSA의 핵심 특징 / MSA의 독보적인 장점",
            "seconds": 555,
            "video": true
          },
          {
            "id": "350015",
            "title": "언제 MSA를 도입하는 게 적절할까?",
            "seconds": 455,
            "video": true
          },
          {
            "id": "350016",
            "title": "많은 사람들이 MSA가 어렵다고 착각하는 이유",
            "seconds": 196,
            "video": true
          },
          {
            "id": "350017",
            "title": "MSA인지 아닌지를 판단하는 기준",
            "seconds": 307,
            "video": true
          },
          {
            "id": "350018",
            "title": "MSA를 쉽고 빠르게 배우는 방법",
            "seconds": 272,
            "video": true
          },
          {
            "id": "351309",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350019",
        "title": "기본적인 마이크로서비스 구축해보기",
        "units": [
          {
            "id": "350020",
            "title": "MSA 프로젝트 요구사항 및 설계",
            "seconds": 289,
            "video": true
          },
          {
            "id": "350021",
            "title": "[실습] 각 Microservice에 해당하는 DB 서버 띄우기",
            "seconds": 303,
            "video": true
          },
          {
            "id": "350022",
            "title": "[실습] User Microservice 만들기",
            "seconds": 796,
            "video": true
          },
          {
            "id": "350023",
            "title": "[실습] Board Microservice 만들기",
            "seconds": 635,
            "video": true
          },
          {
            "id": "350024",
            "title": "구현한 MSA 프로젝트를 잘 구현했는 지 전체적으로 검토하기",
            "seconds": 71,
            "video": true
          },
          {
            "id": "351311",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350025",
        "title": "데이터 조회 API 구현하기 (마이크로서비스 간에 REST API로 통신)",
        "units": [
          {
            "id": "350026",
            "title": "추가 요구사항",
            "seconds": 65,
            "video": true
          },
          {
            "id": "350027",
            "title": "데이터 조회 기능 구현 방식 (모놀리식 vs MSA)",
            "seconds": 323,
            "video": true
          },
          {
            "id": "350029",
            "title": "[실습] 다른 마이크로서비스가 사용할 ‘사용자 조회 API’ 만들기",
            "seconds": 307,
            "video": true
          },
          {
            "id": "350030",
            "title": "[실습] 특정 게시글 조회 API 만들기",
            "seconds": 731,
            "video": true
          },
          {
            "id": "350031",
            "title": "특정 서비스가 장애났을 때, 장애가 전파되지 않게 막는 방법",
            "seconds": 159,
            "video": true
          },
          {
            "id": "350032",
            "title": "[실습] 특정 서비스가 장애났을 때, 장애가 전파되지 않게 방어 코드 작성하기",
            "seconds": 439,
            "video": true
          },
          {
            "id": "350033",
            "title": "[실습] 게시글 전체 조회 API 만들기 - 1",
            "seconds": 325,
            "video": true
          },
          {
            "id": "350034",
            "title": "[실습] 게시글 전체 조회 API 만들기 - 2",
            "seconds": 587,
            "video": true
          },
          {
            "id": "351317",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350035",
        "title": "데이터 쓰기 API 구현하기 (마이크로서비스 간에 REST API로 통신)",
        "units": [
          {
            "id": "350036",
            "title": "추가 요구사항",
            "seconds": 236,
            "video": true
          },
          {
            "id": "350037",
            "title": "[실습] Point Microservice 만들기 - 1",
            "seconds": 139,
            "video": true
          },
          {
            "id": "350038",
            "title": "[실습] Point Microservice 만들기 - 2",
            "seconds": 859,
            "video": true
          },
          {
            "id": "350039",
            "title": "[실습] 회원 가입하면 포인트가 적립되도록 만들기",
            "seconds": 458,
            "video": true
          },
          {
            "id": "350040",
            "title": "[실습] 사용자 활동 점수 적립 API 만들기",
            "seconds": 388,
            "video": true
          },
          {
            "id": "350041",
            "title": "[실습] ‘포인트 차감 → 게시글 작성→ 활동 점수 적립’ 순으로 로직이 처리되도록 만들기",
            "seconds": 508,
            "video": true
          },
          {
            "id": "351312",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350028",
        "title": "MSA 환경에서 트랜잭션 관리하기",
        "units": [
          {
            "id": "350046",
            "title": "게시글 작성 API 로직 수행 중, 중간에 에러가 발생하면 어떻게 될까?",
            "seconds": 557,
            "video": true
          },
          {
            "id": "350047",
            "title": "MSA 환경에서의 트랜잭션 처리 방법",
            "seconds": 136,
            "video": true
          },
          {
            "id": "350048",
            "title": "Saga 패턴이란? / 보상 트랜잭션이란?",
            "seconds": 216,
            "video": true
          },
          {
            "id": "350049",
            "title": "[실습] 게시글 작성 API에 Saga 패턴 적용시키기 - 1",
            "seconds": 668,
            "video": true
          },
          {
            "id": "350050",
            "title": "[실습] 게시글 작성 API에 Saga 패턴 적용시키기 - 2",
            "seconds": 334,
            "video": true
          },
          {
            "id": "350051",
            "title": "Eventual Consistency(최종적 일관성)이란?",
            "seconds": 581,
            "video": true
          },
          {
            "id": "350052",
            "title": "[참고] Saga 패턴을 구현할 때 고려해야 할 요소 (멱등성, 동시성 이슈 등)",
            "seconds": 113,
            "video": true
          },
          {
            "id": "351318",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350045",
        "title": "데이터 쓰기 API 구현하기 (마이크로서비스 간에 메시징 기반으로 통신)",
        "units": [
          {
            "id": "350053",
            "title": "사전 필요 지식",
            "seconds": 58,
            "video": true
          },
          {
            "id": "350054",
            "title": "MSA 환경에서 언제 메시징 기반(비동기 방식)으로 통신하면 좋을까?",
            "seconds": 454,
            "video": true
          },
          {
            "id": "350055",
            "title": "어떻게 구현할 지 설계하기",
            "seconds": 113,
            "video": true
          },
          {
            "id": "350056",
            "title": "[실습] 게시글 서비스에서 Kafka로 ‘게시글 작성 완료 이벤트’ 발행하기",
            "seconds": 458,
            "video": true
          },
          {
            "id": "350057",
            "title": "[실습] 사용자 서비스에서 Kafka로부터 ‘게시글 작성 완료 이벤트’ 구독하기",
            "seconds": 449,
            "video": true
          },
          {
            "id": "350058",
            "title": "[실습] 잘 작동하는 지 테스트하기",
            "seconds": 196,
            "video": true
          },
          {
            "id": "351319",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350044",
        "title": "‘메시징 기반의 데이터 동기화 방식’으로 데이터 조회 최적화하기",
        "units": [
          {
            "id": "350059",
            "title": "‘데이터 동기화’를 활용한 게시글 조회 API 최적화하기",
            "seconds": 234,
            "video": true
          },
          {
            "id": "350060",
            "title": "[실습] 사용자 서비스에서 Kafka로 ‘회원가입 완료 이벤트’ 발행하기",
            "seconds": 322,
            "video": true
          },
          {
            "id": "350061",
            "title": "[실습] 게시글 서비스에서 Kafka로부터 ‘회원가입 완료 이벤트’ 구독하기",
            "seconds": 527,
            "video": true
          },
          {
            "id": "350062",
            "title": "[실습] 잘 작동하는 지 테스트하기",
            "seconds": 217,
            "video": true
          },
          {
            "id": "350063",
            "title": "[실습] 게시글 조회 로직 최적화하기",
            "seconds": 484,
            "video": true
          },
          {
            "id": "351315",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350043",
        "title": "API Gateway를 활용해 클라이언트의 요청을 적절한 서버로 전달하기",
        "units": [
          {
            "id": "350064",
            "title": "API Gateway란?",
            "seconds": 321,
            "video": true
          },
          {
            "id": "350065",
            "title": "[실습] Spring Cloud Gateway 셋팅하기 / 라우팅 설정하기",
            "seconds": 401,
            "video": true
          },
          {
            "id": "350066",
            "title": "[실습] ‘외부용 API’와 ‘마이크로서비스간 통신용 API’ 구분하기",
            "seconds": 529,
            "video": true
          },
          {
            "id": "350067",
            "title": "[실습] API Gateway를 활용해 클라이언트가 접근할 API 제한하기",
            "seconds": 298,
            "video": true
          },
          {
            "id": "351314",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350042",
        "title": "API Gateway를 활용해 JWT 인증 로직 구현하기",
        "units": [
          {
            "id": "350068",
            "title": "MSA에서 ‘인증 로직’ 구현하는 방법",
            "seconds": 137,
            "video": true
          },
          {
            "id": "350069",
            "title": "[실습] 사용자 서비스에 로그인 API 구현하기",
            "seconds": 538,
            "video": true
          },
          {
            "id": "350070",
            "title": "[실습] API Gateway에 JWT 인증 로직 구현하기",
            "seconds": 788,
            "video": true
          },
          {
            "id": "350071",
            "title": "[실습] 게시글 작성 로직 수정하기",
            "seconds": 158,
            "video": true
          },
          {
            "id": "350072",
            "title": "프로젝트의 모든 API 잘 작동하는 지 테스트하기",
            "seconds": 286,
            "video": true
          },
          {
            "id": "351310",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350073",
        "title": "최종 미션",
        "units": [
          {
            "id": "350074",
            "title": "MSA는 꼭 쿠버네티스로 배포해야 할까?",
            "seconds": 128,
            "video": true
          },
          {
            "id": "350075",
            "title": "[미션] AWS에 MSA 프로젝트 배포하기",
            "seconds": 304,
            "video": true
          }
        ]
      },
      {
        "id": "350076",
        "title": "마무리",
        "units": [
          {
            "id": "350077",
            "title": "[참고] 완성 프로젝트 Github 주소",
            "seconds": 0,
            "video": false
          },
          {
            "id": "350078",
            "title": "강의를 끝내며",
            "seconds": 98,
            "video": true
          },
          {
            "id": "350079",
            "title": "완강을 축하드립니다!! 🎉🎉🎉",
            "seconds": 0,
            "video": false
          },
          {
            "id": "351316",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "25": {
    "title": "유행 말고 내공. 30년차 개발자의 실전 바이브 코딩",
    "url": "https://www.inflearn.com/course/%EC%9C%A0%ED%96%89-%EB%A7%90%EA%B3%A0-%EB%82%B4%EA%B3%B5-30%EB%85%84%EC%B0%A8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%8B%A4",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-28 15:55:28",
    "totalSeconds": 44950,
    "totalUnits": 59,
    "sections": [
      {
        "id": "406647",
        "title": "프롤로그, 결심과 현실이해",
        "units": [
          {
            "id": "406648",
            "title": "강의소개",
            "seconds": 511,
            "video": true
          },
          {
            "id": "406675",
            "title": "30년 경력자의 현재와 오만함",
            "seconds": 823,
            "video": true
          },
          {
            "id": "406676",
            "title": "목표 시스템 구성과 필수 배경지식",
            "seconds": 1527,
            "video": true
          },
          {
            "id": "412027",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406677",
        "title": "개발환경 구축",
        "units": [
          {
            "id": "412022",
            "title": "강의자료 PDF",
            "seconds": 0,
            "video": false
          },
          {
            "id": "412023",
            "title": "강의자료 PDF (인쇄용)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "406678",
            "title": "AI도구 선택",
            "seconds": 819,
            "video": true
          },
          {
            "id": "406679",
            "title": "기본 도구 설치",
            "seconds": 977,
            "video": true
          },
          {
            "id": "406680",
            "title": "AI도구 설치 및 환경구성",
            "seconds": 344,
            "video": true
          },
          {
            "id": "406681",
            "title": "개발환경 구축 시나리오",
            "seconds": 852,
            "video": true
          },
          {
            "id": "406682",
            "title": "GitHub 계정 설정 및 소스트리 설치",
            "seconds": 853,
            "video": true
          },
          {
            "id": "412028",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406683",
        "title": "반드시 미리 고려해야 하는 것들",
        "units": [
          {
            "id": "406684",
            "title": "중요한 문제. 보안이슈",
            "seconds": 1009,
            "video": true
          },
          {
            "id": "406686",
            "title": "서비스 운영환경과 비용문제",
            "seconds": 1285,
            "video": true
          },
          {
            "id": "406687",
            "title": "더 복잡한 관리자 시스템",
            "seconds": 922,
            "video": true
          },
          {
            "id": "412029",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406688",
        "title": "준비가 더 중요함",
        "units": [
          {
            "id": "406689",
            "title": "아이디어와 컨셉 빌려오기",
            "seconds": 388,
            "video": true
          },
          {
            "id": "406690",
            "title": "AI와 함께 일하기 (동료의 탄생)",
            "seconds": 862,
            "video": true
          },
          {
            "id": "406691",
            "title": "코딩 전 필수문서 생성",
            "seconds": 746,
            "video": true
          },
          {
            "id": "412030",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406693",
        "title": "Claude Code 사용 및 몸풀기 실습",
        "units": [
          {
            "id": "406694",
            "title": "Claude Code 사용하기",
            "seconds": 749,
            "video": true
          },
          {
            "id": "406695",
            "title": "UI 컴포넌트 쇼케이스 페이지 생성",
            "seconds": 1950,
            "video": true
          }
        ]
      },
      {
        "id": "406696",
        "title": "Todo List 프로젝트 - 로컬 개발",
        "units": [
          {
            "id": "406697",
            "title": "기본 계획수립 사례",
            "seconds": 1103,
            "video": true
          },
          {
            "id": "406698",
            "title": "내 서비스 계획수립",
            "seconds": 718,
            "video": true
          },
          {
            "id": "406699",
            "title": "DB 스키마 정의 및 실습 폴더 생성",
            "seconds": 431,
            "video": true
          },
          {
            "id": "406700",
            "title": "백엔드 개발 및 오류해결",
            "seconds": 1253,
            "video": true
          },
          {
            "id": "406701",
            "title": "프론트엔드 개발",
            "seconds": 559,
            "video": true
          },
          {
            "id": "406702",
            "title": "GitHub 연동",
            "seconds": 970,
            "video": true
          },
          {
            "id": "406703",
            "title": "소셜 로그인과 OAuth",
            "seconds": 899,
            "video": true
          },
          {
            "id": "406704",
            "title": "구글 클라우드 ID 발급",
            "seconds": 811,
            "video": true
          },
          {
            "id": "406705",
            "title": "구글 로그인 구현하기",
            "seconds": 1078,
            "video": true
          },
          {
            "id": "412036",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406706",
        "title": "의외로 신경써야 할 웹 에디터",
        "units": [
          {
            "id": "406707",
            "title": "웹 에디터의 중요성",
            "seconds": 677,
            "video": true
          },
          {
            "id": "406708",
            "title": "에디터 때문에 낭패 본 사연",
            "seconds": 480,
            "video": true
          },
          {
            "id": "406709",
            "title": "중요한 결정의 순간!",
            "seconds": 1235,
            "video": true
          },
          {
            "id": "412031",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406710",
        "title": "AWS 환경으로 넘어가는 출발점",
        "units": [
          {
            "id": "406711",
            "title": "Tiptap 에디터 붙이기",
            "seconds": 588,
            "video": true
          },
          {
            "id": "406712",
            "title": "목표 AWS 환경 정의 및 회원가입",
            "seconds": 489,
            "video": true
          }
        ]
      },
      {
        "id": "406713",
        "title": "AWS S3 버킷 연동",
        "units": [
          {
            "id": "406714",
            "title": "S3 버킷 소개",
            "seconds": 943,
            "video": true
          },
          {
            "id": "406715",
            "title": "S3 버킷 생성",
            "seconds": 258,
            "video": true
          },
          {
            "id": "406716",
            "title": "IAM 정책 및 사용자 생성",
            "seconds": 1593,
            "video": true
          },
          {
            "id": "406717",
            "title": "버킷 정책 및 CORS 설정",
            "seconds": 1692,
            "video": true
          },
          {
            "id": "406718",
            "title": "DB 스키마 수정 및 백엔드 개발",
            "seconds": 444,
            "video": true
          },
          {
            "id": "406719",
            "title": "프론트엔드 수정",
            "seconds": 877,
            "video": true
          },
          {
            "id": "412032",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406720",
        "title": "AWS RDS로 DB이관",
        "units": [
          {
            "id": "406721",
            "title": "RDS 소개",
            "seconds": 575,
            "video": true
          },
          {
            "id": "406722",
            "title": "RDS로 데이터 이관하기",
            "seconds": 1029,
            "video": true
          }
        ]
      },
      {
        "id": "406723",
        "title": "EC2 기반 백엔드 수작업 배포",
        "units": [
          {
            "id": "406724",
            "title": "EC2 소개",
            "seconds": 396,
            "video": true
          },
          {
            "id": "406725",
            "title": "EC2 인스턴스 생성",
            "seconds": 776,
            "video": true
          },
          {
            "id": "406726",
            "title": "탄력적 IP 할당과 SSH 접속",
            "seconds": 509,
            "video": true
          },
          {
            "id": "406727",
            "title": "AI와 서버 배포 협의",
            "seconds": 675,
            "video": true
          },
          {
            "id": "406728",
            "title": "백엔드 배포 준비",
            "seconds": 443,
            "video": true
          },
          {
            "id": "406729",
            "title": "백엔드 빌드 및 배포",
            "seconds": 993,
            "video": true
          },
          {
            "id": "412034",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406730",
        "title": "Amplify 및 프론트 배포",
        "units": [
          {
            "id": "406731",
            "title": "Amplify 소개",
            "seconds": 686,
            "video": true
          },
          {
            "id": "406732",
            "title": "Amplify와 GitHub 연결하기",
            "seconds": 488,
            "video": true
          },
          {
            "id": "406733",
            "title": "프론트엔드와 백엔드 연결",
            "seconds": 1616,
            "video": true
          },
          {
            "id": "406734",
            "title": "구글 로그인 적용",
            "seconds": 335,
            "video": true
          },
          {
            "id": "411785",
            "title": "CloudFront에 S3 오리진 추가 및 최종완료",
            "seconds": 1394,
            "video": true
          },
          {
            "id": "406735",
            "title": "Elastic Beanstalk 소개",
            "seconds": 365,
            "video": true
          },
          {
            "id": "412035",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406736",
        "title": "개발의 7할은 디버깅",
        "units": [
          {
            "id": "406737",
            "title": "DB 스키마 변경 시 주의사항",
            "seconds": 625,
            "video": true
          },
          {
            "id": "406738",
            "title": "당황스러운 EC2 인스턴스 다운사례",
            "seconds": 550,
            "video": true
          },
          {
            "id": "406739",
            "title": "Python으로 뒷통수 얻어 맞기",
            "seconds": 261,
            "video": true
          },
          {
            "id": "406740",
            "title": "생각도 못했던 아이폰",
            "seconds": 489,
            "video": true
          },
          {
            "id": "406741",
            "title": "프론트, 백엔드 분리 개발 문제",
            "seconds": 315,
            "video": true
          },
          {
            "id": "412033",
            "title": "섹션 13 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "406742",
        "title": "이것으로 마무리",
        "units": [
          {
            "id": "406743",
            "title": "끝내고 드는 생각들",
            "seconds": 342,
            "video": true
          },
          {
            "id": "406744",
            "title": "에필로그",
            "seconds": 373,
            "video": true
          }
        ]
      }
    ]
  },
  "extra-spring-db2": {
    "title": "스프링 DB 2편 - 데이터 접근 활용 기술",
    "url": "https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-db-2",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-01-30 20:39:02",
    "totalSeconds": 50374,
    "totalUnits": 88,
    "sections": [
      {
        "id": "114598",
        "title": "강의 소개",
        "units": [
          {
            "id": "114612",
            "title": "강의 소개",
            "seconds": 172,
            "video": true
          },
          {
            "id": "114599",
            "title": "수업 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "114613",
            "title": "강의 소스 코드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "114721",
            "title": "PPT 자료",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114614",
        "title": "데이터 접근 기술 - 시작",
        "units": [
          {
            "id": "114615",
            "title": "데이터 접근 기술 진행 방식 소개",
            "seconds": 381,
            "video": true
          },
          {
            "id": "114616",
            "title": "프로젝트 설정과 메모리 저장소",
            "seconds": 247,
            "video": true
          },
          {
            "id": "114617",
            "title": "프로젝트 구조 설명1 - 기본",
            "seconds": 1097,
            "video": true
          },
          {
            "id": "114618",
            "title": "프로젝트 구조 설명2 - 설정",
            "seconds": 804,
            "video": true
          },
          {
            "id": "114619",
            "title": "프로젝트 구조 설명3 - 테스트",
            "seconds": 467,
            "video": true
          },
          {
            "id": "114620",
            "title": "데이터베이스 테이블 생성",
            "seconds": 456,
            "video": true
          },
          {
            "id": "114621",
            "title": "정리",
            "seconds": 115,
            "video": true
          },
          {
            "id": "291871",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114622",
        "title": "데이터 접근 기술 - 스프링 JdbcTemplate",
        "units": [
          {
            "id": "114623",
            "title": "JdbcTemplate 소개와 설정",
            "seconds": 230,
            "video": true
          },
          {
            "id": "114624",
            "title": "JdbcTemplate 적용1 - 기본",
            "seconds": 1160,
            "video": true
          },
          {
            "id": "114625",
            "title": "JdbcTemplate 적용2 - 동적 쿼리 문제",
            "seconds": 287,
            "video": true
          },
          {
            "id": "114626",
            "title": "JdbcTemplate 적용3 - 구성과 실행",
            "seconds": 467,
            "video": true
          },
          {
            "id": "114627",
            "title": "JdbcTemplate - 이름 지정 파라미터 1",
            "seconds": 789,
            "video": true
          },
          {
            "id": "114628",
            "title": "JdbcTemplate - 이름 지정 파라미터 2",
            "seconds": 662,
            "video": true
          },
          {
            "id": "114629",
            "title": "JdbcTemplate - 이름 지정 파라미터 3",
            "seconds": 164,
            "video": true
          },
          {
            "id": "114630",
            "title": "JdbcTemplate - SimpleJdbcInsert",
            "seconds": 416,
            "video": true
          },
          {
            "id": "114631",
            "title": "JdbcTemplate 기능 정리",
            "seconds": 223,
            "video": true
          },
          {
            "id": "114632",
            "title": "정리",
            "seconds": 232,
            "video": true
          },
          {
            "id": "291870",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114633",
        "title": "데이터 접근 기술 - 테스트",
        "units": [
          {
            "id": "114634",
            "title": "테스트 - 데이터베이스 연동",
            "seconds": 624,
            "video": true
          },
          {
            "id": "114635",
            "title": "테스트 - 데이터베이스 분리",
            "seconds": 449,
            "video": true
          },
          {
            "id": "114636",
            "title": "테스트 - 데이터 롤백",
            "seconds": 569,
            "video": true
          },
          {
            "id": "114637",
            "title": "테스트 - @Transactional",
            "seconds": 710,
            "video": true
          },
          {
            "id": "114638",
            "title": "테스트 - 임베디드 모드 DB",
            "seconds": 659,
            "video": true
          },
          {
            "id": "114639",
            "title": "테스트 - 스프링 부트와 임베디드 모드",
            "seconds": 336,
            "video": true
          },
          {
            "id": "114640",
            "title": "정리",
            "seconds": 222,
            "video": true
          },
          {
            "id": "291875",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114641",
        "title": "데이터 접근 기술 - MyBatis",
        "units": [
          {
            "id": "114642",
            "title": "MyBatis 소개",
            "seconds": 322,
            "video": true
          },
          {
            "id": "114643",
            "title": "MyBatis 설정",
            "seconds": 532,
            "video": true
          },
          {
            "id": "114644",
            "title": "MyBatis 적용1 - 기본",
            "seconds": 1237,
            "video": true
          },
          {
            "id": "114645",
            "title": "MyBatis 적용2 - 설정과 실행",
            "seconds": 398,
            "video": true
          },
          {
            "id": "114646",
            "title": "MyBatis 적용3 - 분석",
            "seconds": 439,
            "video": true
          },
          {
            "id": "114647",
            "title": "MyBatis 기능 정리1 - 동적 쿼리",
            "seconds": 248,
            "video": true
          },
          {
            "id": "114648",
            "title": "MyBatis 기능 정리2 - 기타 기능",
            "seconds": 419,
            "video": true
          },
          {
            "id": "114649",
            "title": "정리",
            "seconds": 252,
            "video": true
          },
          {
            "id": "291867",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114650",
        "title": "데이터 접근 기술 - JPA",
        "units": [
          {
            "id": "114651",
            "title": "JPA 시작",
            "seconds": 276,
            "video": true
          },
          {
            "id": "114652",
            "title": "ORM 개념1 - SQL 중심적인 개발의 문제점",
            "seconds": 898,
            "video": true
          },
          {
            "id": "114653",
            "title": "ORM 개념2 - JPA 소개",
            "seconds": 968,
            "video": true
          },
          {
            "id": "114654",
            "title": "JPA 설정",
            "seconds": 214,
            "video": true
          },
          {
            "id": "114655",
            "title": "JPA 적용1 - 개발",
            "seconds": 1208,
            "video": true
          },
          {
            "id": "114656",
            "title": "JPA 적용2 - 리포지토리 분석",
            "seconds": 362,
            "video": true
          },
          {
            "id": "114657",
            "title": "JPA 적용3 - 예외 변환",
            "seconds": 607,
            "video": true
          },
          {
            "id": "114658",
            "title": "정리",
            "seconds": 298,
            "video": true
          },
          {
            "id": "291874",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114659",
        "title": "데이터 접근 기술 - 스프링 데이터 JPA",
        "units": [
          {
            "id": "114660",
            "title": "스프링 데이터 JPA 소개1 - 등장 이유",
            "seconds": 767,
            "video": true
          },
          {
            "id": "114661",
            "title": "스프링 데이터 JPA 소개2 - 기능",
            "seconds": 647,
            "video": true
          },
          {
            "id": "114662",
            "title": "스프링 데이터 JPA 주요 기능",
            "seconds": 566,
            "video": true
          },
          {
            "id": "114663",
            "title": "스프링 데이터 JPA 적용1",
            "seconds": 563,
            "video": true
          },
          {
            "id": "114664",
            "title": "스프링 데이터 JPA 적용2",
            "seconds": 1500,
            "video": true
          },
          {
            "id": "114665",
            "title": "정리",
            "seconds": 203,
            "video": true
          },
          {
            "id": "291876",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114666",
        "title": "데이터 접근 기술 - Querydsl",
        "units": [
          {
            "id": "114667",
            "title": "Querydsl 소개1 - 기존 방식의 문제점",
            "seconds": 567,
            "video": true
          },
          {
            "id": "114668",
            "title": "Querydsl 소개2 - 해결",
            "seconds": 478,
            "video": true
          },
          {
            "id": "114669",
            "title": "Querydsl 설정",
            "seconds": 614,
            "video": true
          },
          {
            "id": "114670",
            "title": "Querydsl 적용",
            "seconds": 955,
            "video": true
          },
          {
            "id": "114671",
            "title": "정리",
            "seconds": 169,
            "video": true
          },
          {
            "id": "291879",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114672",
        "title": "데이터 접근 기술 - 활용 방안",
        "units": [
          {
            "id": "114673",
            "title": "스프링 데이터 JPA 예제와 트레이드 오프",
            "seconds": 1007,
            "video": true
          },
          {
            "id": "114674",
            "title": "실용적인 구조",
            "seconds": 1107,
            "video": true
          },
          {
            "id": "114675",
            "title": "다양한 데이터 접근 기술 조합",
            "seconds": 426,
            "video": true
          },
          {
            "id": "114676",
            "title": "정리",
            "seconds": 146,
            "video": true
          },
          {
            "id": "291863",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114677",
        "title": "스프링 트랜잭션 이해",
        "units": [
          {
            "id": "114678",
            "title": "스프링 트랜잭션 소개",
            "seconds": 585,
            "video": true
          },
          {
            "id": "114679",
            "title": "프로젝트 생성",
            "seconds": 153,
            "video": true
          },
          {
            "id": "114680",
            "title": "트랜잭션 적용 확인",
            "seconds": 834,
            "video": true
          },
          {
            "id": "114681",
            "title": "트랜잭션 적용 위치",
            "seconds": 826,
            "video": true
          },
          {
            "id": "114682",
            "title": "트랜잭션 AOP 주의 사항 - 프록시 내부 호출1",
            "seconds": 1104,
            "video": true
          },
          {
            "id": "114683",
            "title": "트랜잭션 AOP 주의 사항 - 프록시 내부 호출2",
            "seconds": 537,
            "video": true
          },
          {
            "id": "114684",
            "title": "트랜잭션 AOP 주의 사항 - 초기화 시점",
            "seconds": 411,
            "video": true
          },
          {
            "id": "114685",
            "title": "트랜잭션 옵션 소개",
            "seconds": 738,
            "video": true
          },
          {
            "id": "114686",
            "title": "예외와 트랜잭션 커밋, 롤백 - 기본",
            "seconds": 714,
            "video": true
          },
          {
            "id": "114687",
            "title": "예외와 트랜잭션 커밋, 롤백 - 활용",
            "seconds": 1819,
            "video": true
          },
          {
            "id": "114688",
            "title": "정리",
            "seconds": 290,
            "video": true
          },
          {
            "id": "291866",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114689",
        "title": "스프링 트랜잭션 전파1 - 기본",
        "units": [
          {
            "id": "114690",
            "title": "스프링 트랜잭션 전파1 - 커밋, 롤백",
            "seconds": 404,
            "video": true
          },
          {
            "id": "114691",
            "title": "스프링 트랜잭션 전파2 - 트랜잭션 두 번 사용",
            "seconds": 645,
            "video": true
          },
          {
            "id": "114692",
            "title": "스프링 트랜잭션 전파3 - 전파 기본",
            "seconds": 546,
            "video": true
          },
          {
            "id": "114693",
            "title": "스프링 트랜잭션 전파4 - 전파 예제",
            "seconds": 1294,
            "video": true
          },
          {
            "id": "114694",
            "title": "스프링 트랜잭션 전파5 - 외부 롤백",
            "seconds": 426,
            "video": true
          },
          {
            "id": "114695",
            "title": "스프링 트랜잭션 전파6 - 내부 롤백",
            "seconds": 902,
            "video": true
          },
          {
            "id": "114696",
            "title": "스프링 트랜잭션 전파7 - REQUIRES_NEW",
            "seconds": 1067,
            "video": true
          },
          {
            "id": "114697",
            "title": "스프링 트랜잭션 전파8 - 다양한 전파 옵션",
            "seconds": 327,
            "video": true
          },
          {
            "id": "114698",
            "title": "정리",
            "seconds": 355,
            "video": true
          },
          {
            "id": "291872",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114699",
        "title": "스프링 트랜잭션 전파2 - 활용",
        "units": [
          {
            "id": "114700",
            "title": "트랜잭션 전파 활용1 - 예제 프로젝트 시작",
            "seconds": 1077,
            "video": true
          },
          {
            "id": "114701",
            "title": "트랜잭션 전파 활용2 - 커밋, 롤백",
            "seconds": 556,
            "video": true
          },
          {
            "id": "114702",
            "title": "트랜잭션 전파 활용3 - 단일 트랜잭션",
            "seconds": 582,
            "video": true
          },
          {
            "id": "114703",
            "title": "트랜잭션 전파 활용4 - 전파 커밋",
            "seconds": 290,
            "video": true
          },
          {
            "id": "114704",
            "title": "트랜잭션 전파 활용5 - 전파 롤백",
            "seconds": 439,
            "video": true
          },
          {
            "id": "114705",
            "title": "트랜잭션 전파 활용6 - 복구 REQUIRED",
            "seconds": 606,
            "video": true
          },
          {
            "id": "114706",
            "title": "트랜잭션 전파 활용7 - 복구 REQUIRES_NEW",
            "seconds": 608,
            "video": true
          },
          {
            "id": "114707",
            "title": "정리",
            "seconds": 421,
            "video": true
          },
          {
            "id": "291885",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "114708",
        "title": "다음으로",
        "units": [
          {
            "id": "114709",
            "title": "다음으로",
            "seconds": 1487,
            "video": true
          }
        ]
      }
    ]
  },
  "33": {
    "title": "[Lv2] 현업 개발자의 JPA 완전 정복 - 영속성 컨텍스트부터 실무 패턴까지",
    "url": "https://www.inflearn.com/course/lv2-jpa-mastery-for",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-04-21 08:24:22",
    "totalSeconds": 34756,
    "totalUnits": 41,
    "sections": [
      {
        "id": "398929",
        "title": "[1주차] JDBC의 고통에서 영속성 컨텍스트의 구원으로",
        "units": [
          {
            "id": "398930",
            "title": "수업 교재 링크",
            "seconds": 0,
            "video": false
          },
          {
            "id": "425615",
            "title": "1-1. 🎬 오리엔테이션: 이 강의가 다른 JPA 강의와 다른 이유",
            "seconds": 378,
            "video": true
          },
          {
            "id": "425617",
            "title": "1-2. 😱 순수 JDBC의 고통 체험 (1): SELECT 하나에 35줄의 지옥",
            "seconds": 1741,
            "video": true
          },
          {
            "id": "425618",
            "title": "1-3. 🔥 순수 JDBC의 고통 체험 (2): 숨어있는 5가지 치명적 문제",
            "seconds": 663,
            "video": true
          },
          {
            "id": "425619",
            "title": "1-4. 🦸 영속성 컨텍스트: 20년간 개발자 고통을 해결한 구원자",
            "seconds": 850,
            "video": true
          },
          {
            "id": "425620",
            "title": "1-5. 📦 1차 캐시: \"같은 거 왜 두 번 물어?\" DB 접근 최소화의 비밀",
            "seconds": 1472,
            "video": true
          },
          {
            "id": "425621",
            "title": "1-6. 🪞 동일성 보장: \"같은 사람은 같은 사람\" Identity Map 패턴",
            "seconds": 1184,
            "video": true
          },
          {
            "id": "425622",
            "title": "1-7. 🔍 변경 감지(Dirty Checking): \"니가 뭘 바꿨는지 내가 안다”",
            "seconds": 1008,
            "video": true
          },
          {
            "id": "425623",
            "title": "1-8. 📮 쓰기 지연: \"모아서 한 방에\" 네트워크 비용 최적화",
            "seconds": 1190,
            "video": true
          },
          {
            "id": "428826",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "425624",
        "title": "[2주차] EntityManager에서 JpaRepository까지",
        "units": [
          {
            "id": "425625",
            "title": "2-1. 🏷️ 엔티티 매핑 기초: @Entity, @Table, @Column 완벽 이해",
            "seconds": 1256,
            "video": true
          },
          {
            "id": "425626",
            "title": "2-2. 🔑 기본 키 매핑: \"ID, 내가 넣을게 vs 니가 넣어줘”",
            "seconds": 1735,
            "video": true
          },
          {
            "id": "425627",
            "title": "2-3. 🚽 플러시(Flush): \"물이 내려가는 순간\" 영속성 컨텍스트의 동기화",
            "seconds": 985,
            "video": true
          },
          {
            "id": "425628",
            "title": "2-4.  👻 준영속 상태(Detached): \"비서가 퇴근하면 생기는 일\"",
            "seconds": 751,
            "video": true
          },
          {
            "id": "425631",
            "title": "2-5. 🎁 Spring Data JPA 소개: 인터페이스만 만들면 구현은 Spring이 알아서",
            "seconds": 942,
            "video": true
          },
          {
            "id": "425632",
            "title": "2-6. 📦 Spring Data JPA save() 심화: 식별자와 병합(Merge)의 함정",
            "seconds": 904,
            "video": true
          }
        ]
      },
      {
        "id": "425633",
        "title": "[3주차] 객체와 테이블의 조화: 연관관계 매핑과 생명주기 통제",
        "units": [
          {
            "id": "425634",
            "title": "3-1. 🌍 객체 세계 vs 테이블 세계: 참조와 외래키의 근본적 차이",
            "seconds": 787,
            "video": true
          },
          {
            "id": "425635",
            "title": "3-2. ➡️ 단방향 연관관계: @ManyToOne으로 시작하는 첫 번째 매핑",
            "seconds": 604,
            "video": true
          },
          {
            "id": "425636",
            "title": "3-3. ↔️ 양방향 연관관계와 주인의 법칙 (feat. 편의 메서드)",
            "seconds": 1211,
            "video": true
          },
          {
            "id": "425637",
            "title": "3-4. 📚 다양한 연관관계: 일대다, 일대일, 다대다(쓰면 안 되는 이유)",
            "seconds": 1031,
            "video": true
          },
          {
            "id": "425638",
            "title": "3-5. ⚡ 즉시 로딩 vs 지연 로딩: 왜 LAZY가 기본이어야 할까?",
            "seconds": 473,
            "video": true
          },
          {
            "id": "425639",
            "title": "3-6. 🎭 프록시: 지연 로딩을 가능하게 하는 \"가짜 객체”",
            "seconds": 982,
            "video": true
          },
          {
            "id": "425640",
            "title": "3-7. 😴 지연 로딩의 내부 동작: 프록시가 진짜 객체로 바뀌는 순간",
            "seconds": 1671,
            "video": true
          },
          {
            "id": "425641",
            "title": "3-8. 👨‍👦 영속성 전이(CASCADE): \"엄마가 가면 나도 간다”",
            "seconds": 630,
            "video": true
          },
          {
            "id": "425643",
            "title": "3-9. 🗑️ 고아 객체(Orphan Removal): \"부모 잃은 자식은 삭제된다”",
            "seconds": 490,
            "video": true
          }
        ]
      },
      {
        "id": "425644",
        "title": "[4주차] 고급 매핑과 객체지향 모델링: 상속, 값 타입, 그리고 복합 키 정복",
        "units": [
          {
            "id": "425645",
            "title": "4-1. 🧬 상속관계 매핑 (1): 조인 전략 - 정규화된 테이블 설계",
            "seconds": 848,
            "video": true
          },
          {
            "id": "425646",
            "title": "4-2. 🗂️ 상속관계 매핑 (2): 단일 테이블 전략 - 조회 성능 최적화",
            "seconds": 372,
            "video": true
          },
          {
            "id": "425647",
            "title": "4-3. 📋 @MappedSuperclass: BaseEntity로 공통 필드 상속하기",
            "seconds": 534,
            "video": true
          },
          {
            "id": "425648",
            "title": "4-4. 💳 실무 적용: 결제 도메인에서의 상속 매핑과 AttributeConverter",
            "seconds": 678,
            "video": true
          },
          {
            "id": "425649",
            "title": "4-5. 🎁 값 타입 (1): 임베디드 타입으로 객체지향적 모델링",
            "seconds": 587,
            "video": true
          },
          {
            "id": "425650",
            "title": "4-6. 🔒 값 타입 (2): 불변 객체와 값 타입 비교",
            "seconds": 612,
            "video": true
          },
          {
            "id": "425651",
            "title": "4-7. 📚 값 타입 컬렉션: 한계점과 대안",
            "seconds": 875,
            "video": true
          },
          {
            "id": "425652",
            "title": "4-8. 🔑 복합 키와 식별/비식별 관계: @IdClass vs @EmbeddedId",
            "seconds": 886,
            "video": true
          }
        ]
      },
      {
        "id": "425653",
        "title": "[5주차] 실무의 꽃, QueryDSL로 동적 쿼리와 성능 최적화 정복",
        "units": [
          {
            "id": "425654",
            "title": "5-1. 🏗️ 프로젝트 환경 설정과 Q클래스의 비밀",
            "seconds": 922,
            "video": true
          },
          {
            "id": "425655",
            "title": "5-2. 🔎 기본 문법: 검색, 정렬, 페이징, 집합",
            "seconds": 943,
            "video": true
          },
          {
            "id": "425656",
            "title": "5-3. 🔗 조인(Join)과 페치 조인: N+1 문제의 해결사",
            "seconds": 543,
            "video": true
          },
          {
            "id": "425657",
            "title": "5-4. 🧩 서브 쿼리와 고급 문법: Case, 상수, 문자 더하기",
            "seconds": 527,
            "video": true
          },
          {
            "id": "425658",
            "title": "5-5.🚦 동적 쿼리: BooleanBuilder와 Where 다중 파라미터",
            "seconds": 573,
            "video": true
          },
          {
            "id": "425659",
            "title": "5-6. 🏛️ 실무 활용: 순수 JPA와 Spring Data JPA 리포지토리 통합",
            "seconds": 876,
            "video": true
          },
          {
            "id": "425660",
            "title": "5-7. ⚡성능 최적화: DTO 조회(Projections)와 벌크 연산",
            "seconds": 1446,
            "video": true
          },
          {
            "id": "425661",
            "title": "5-8. 🧪 SQL 함수 호출: Dialect와 QueryDSL의 한계 돌파",
            "seconds": 596,
            "video": true
          },
          {
            "id": "437089",
            "title": "🎁 EVENT🎁 수강평 인증하는 방법",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "44": {
    "title": "컴맹도 따라하는 주식 바이브코딩 - AI로 만드는 주식 자동매매 시스템",
    "url": "https://www.inflearn.com/course/stock-vibe-coding-ev",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-13 13:45:18",
    "totalSeconds": 27632,
    "totalUnits": 56,
    "sections": [
      {
        "id": "431996",
        "title": "인트로",
        "units": [
          {
            "id": "431554",
            "title": "⚠️ 수강 전 반드시 확인하세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "431997",
            "title": "강의소개",
            "seconds": 243,
            "video": true
          },
          {
            "id": "429100",
            "title": "🖥️ 개발자 또는 코딩이 익숙하신 분들은 구매 전 꼭 읽어주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "429949",
            "title": "[ 🚨 모든 분들 필독! ] 반드시 읽어주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "478961",
            "title": "📕 강의 새소식",
            "seconds": 0,
            "video": false
          },
          {
            "id": "432008",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "431998",
        "title": "환경 세팅과 서비스 연결",
        "units": [
          {
            "id": "443855",
            "title": "🖥️ 프로그램 화면이 강의와 달라진다면 메일주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "417871",
            "title": "개발환경 설치와 세팅",
            "seconds": 1083,
            "video": true
          },
          {
            "id": "417872",
            "title": "앱 키 설정과 로그인 (상)",
            "seconds": 756,
            "video": true
          },
          {
            "id": "417873",
            "title": "앱 키 설정과 로그인 (하)",
            "seconds": 886,
            "video": true
          },
          {
            "id": "482861",
            "title": "민감한 정보에 AI가 접근하지 않도록 설정하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "429414",
            "title": "⚙️ 부품들 미리 설치해두기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "422730",
            "title": "간단한 조회 기능 사용하기",
            "seconds": 531,
            "video": true
          },
          {
            "id": "422731",
            "title": "텔레그램 연동하기",
            "seconds": 683,
            "video": true
          },
          {
            "id": "456652",
            "title": "💰 [부록] 주식 초보를 위한 필수 개념들 📈",
            "seconds": 0,
            "video": false
          },
          {
            "id": "432010",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "431999",
        "title": "기본 기능들 만들기",
        "units": [
          {
            "id": "429417",
            "title": "🖥️ PC용 텔레그램을 활용해주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "446172",
            "title": "📝 강의 전체의 노션페이지 주소",
            "seconds": 0,
            "video": false
          },
          {
            "id": "422732",
            "title": "원격 명령 체계 구축하기",
            "seconds": 761,
            "video": true
          },
          {
            "id": "429415",
            "title": "🗑️ 프로그램 재실행 전 반드시 종료를 먼저 해주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "477825",
            "title": "🛑 [필독] 다음 레슨으로 넘어가기 전 꼭 확인해주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "425405",
            "title": "키움 가이드 어시스턴트",
            "seconds": 630,
            "video": true
          },
          {
            "id": "430118",
            "title": "🤖 어시스턴트 젬에 대해 알아둘 것",
            "seconds": 0,
            "video": false
          },
          {
            "id": "425406",
            "title": "종목 사고팔기",
            "seconds": 702,
            "video": true
          },
          {
            "id": "425557",
            "title": "기본 설정, 예약, 도움말",
            "seconds": 584,
            "video": true
          },
          {
            "id": "432011",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "417870",
        "title": "보다 강력한 기능들 만들기",
        "units": [
          {
            "id": "426611",
            "title": "스탑로스",
            "seconds": 990,
            "video": true
          },
          {
            "id": "426612",
            "title": "🚨 종목코드 관련 이슈",
            "seconds": 0,
            "video": false
          },
          {
            "id": "427093",
            "title": "어시스턴트 젬 보완, 순위조회",
            "seconds": 758,
            "video": true
          },
          {
            "id": "429074",
            "title": "골든크로스와 데드크로스",
            "seconds": 1119,
            "video": true
          },
          {
            "id": "429098",
            "title": "🤚 다음 레슨으로 넘어가기 전 읽어주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "429539",
            "title": "조건검색식 연동 ( 🏔️ 여기가 고비! 💦 실습 전 프로젝트 복제 필수! 💾 )",
            "seconds": 1216,
            "video": true
          },
          {
            "id": "434340",
            "title": "‼️ 조건검색식들이 계속 조회되지 않는다면?",
            "seconds": 0,
            "video": false
          },
          {
            "id": "429957",
            "title": "트레일링 스탑 (HTTP vs. 웹소켓)",
            "seconds": 951,
            "video": true
          },
          {
            "id": "430523",
            "title": "추가기능들 (호가, 미체결, 체결확인, 종목제한, 쿨다운 등...)",
            "seconds": 620,
            "video": true
          },
          {
            "id": "444624",
            "title": "추가기능들 상세버전 (👆 이전 레슨으로 실습이 어려웠다면 시청하세요)",
            "seconds": 827,
            "video": true
          },
          {
            "id": "432009",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "445141",
        "title": "사람의 말로 기능 지시하기",
        "units": [
          {
            "id": "437434",
            "title": "🎯 자연어로 명령하기 (우리말 챗으로 일 시키기) 🎉🎉🎉",
            "seconds": 587,
            "video": true
          },
          {
            "id": "436733",
            "title": "커맨드 세이프 옵션 (자연어 승인 없이 실행하기)",
            "seconds": 199,
            "video": true
          },
          {
            "id": "437469",
            "title": "🎙️ 음성으로 명령하기",
            "seconds": 146,
            "video": true
          },
          {
            "id": "446273",
            "title": "종목코드 확인 (자연어 명령 이슈)",
            "seconds": 293,
            "video": true
          }
        ]
      },
      {
        "id": "445142",
        "title": "고급 기능 및 전략들",
        "units": [
          {
            "id": "431538",
            "title": "일일 로그와 AI 분석",
            "seconds": 455,
            "video": true
          },
          {
            "id": "432530",
            "title": "차트 이미지 톡으로 받아오기",
            "seconds": 367,
            "video": true
          },
          {
            "id": "435554",
            "title": "테마 관련 기능",
            "seconds": 354,
            "video": true
          },
          {
            "id": "440386",
            "title": "공매도, 대차거래 관련 기능",
            "seconds": 344,
            "video": true
          },
          {
            "id": "443272",
            "title": "변동성 완화 장치(VI) 발동 감지 & 연동",
            "seconds": 492,
            "video": true
          },
          {
            "id": "445244",
            "title": "돌파매수",
            "seconds": 307,
            "video": true
          },
          {
            "id": "446415",
            "title": "분할 트레이딩",
            "seconds": 323,
            "video": true
          },
          {
            "id": "446537",
            "title": "그리드 트레이딩",
            "seconds": 221,
            "video": true
          }
        ]
      },
      {
        "id": "435350",
        "title": "추가 레슨들",
        "units": [
          {
            "id": "431854",
            "title": "✉️ 더 알고 싶은 내용들을 제보해주세요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "434992",
            "title": "ℹ️ 본 섹션의 레슨들은 이동될 수 있습니다.",
            "seconds": 0,
            "video": false
          },
          {
            "id": "432000",
            "title": "유동 아이피 문제 해결",
            "seconds": 598,
            "video": true
          },
          {
            "id": "434427",
            "title": "다른 컴퓨터에서 실행하기",
            "seconds": 246,
            "video": true
          },
          {
            "id": "445245",
            "title": "👋 커서(Cursor) 유료 플랜 해지하기",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "431325",
        "title": "프로그램을 더 잘 만들기 위한 지식들",
        "units": [
          {
            "id": "431330",
            "title": "📚 부록 소개",
            "seconds": 0,
            "video": false
          },
          {
            "id": "431326",
            "title": "API란?",
            "seconds": 547,
            "video": true
          },
          {
            "id": "431327",
            "title": "REST API란?",
            "seconds": 780,
            "video": true
          },
          {
            "id": "431328",
            "title": "웹소켓이란?",
            "seconds": 553,
            "video": true
          },
          {
            "id": "431332",
            "title": "Git",
            "seconds": 7480,
            "video": true
          },
          {
            "id": "432022",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "477533",
        "title": "🎉 감사합니다!",
        "units": [
          {
            "id": "477534",
            "title": "다른 AI 강의 할인쿠폰",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "13": {
    "title": "토스 개발자와 함께하는 Data Workflow Management 기반의 대용량 데이터 처리 설계 패턴",
    "url": "https://www.inflearn.com/course/%ED%86%A0%EC%8A%A4-%EC%8B%9C%EB%8B%88%EC%96%B4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-dat",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-09-19 19:55:03",
    "totalSeconds": 16767,
    "totalUnits": 29,
    "sections": [
      {
        "id": "347439",
        "title": "강의 소개 및 강의 자료",
        "units": [
          {
            "id": "347440",
            "title": "강의 소개",
            "seconds": 555,
            "video": true
          },
          {
            "id": "350092",
            "title": "실습 소스코드 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "350093",
            "title": "강의 내용 요약 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "350094",
            "title": "강의 참고 사항",
            "seconds": 264,
            "video": true
          }
        ]
      },
      {
        "id": "350095",
        "title": "Why We Want to Build a Data Pipeline?",
        "units": [
          {
            "id": "350096",
            "title": "What is Airflow?",
            "seconds": 555,
            "video": true
          },
          {
            "id": "350097",
            "title": "Batch Job & Cron Job Vs Airflow",
            "seconds": 397,
            "video": true
          },
          {
            "id": "350098",
            "title": "Apache Airfow의 단점과 도입에 대한 안티 패턴",
            "seconds": 500,
            "video": true
          },
          {
            "id": "355196",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350099",
        "title": "Airflow Core Components And Architecture",
        "units": [
          {
            "id": "350100",
            "title": "전체적인 Core Components Architecture 소개",
            "seconds": 666,
            "video": true
          },
          {
            "id": "350101",
            "title": "WebServer Components Deep Dive",
            "seconds": 801,
            "video": true
          },
          {
            "id": "350102",
            "title": "Scheduler Components Deep Dive",
            "seconds": 564,
            "video": true
          },
          {
            "id": "350103",
            "title": "Executor Components Deep Dive",
            "seconds": 607,
            "video": true
          },
          {
            "id": "350104",
            "title": "MetaDataDB Components Deep Dive",
            "seconds": 302,
            "video": true
          },
          {
            "id": "355197",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350105",
        "title": "DAG & Task 고급 설계 패턴",
        "units": [
          {
            "id": "350106",
            "title": "동적 DAG 생성 패턴 [ Dynamic DAG ]",
            "seconds": 574,
            "video": true
          },
          {
            "id": "350107",
            "title": "Cross-DAG Dependencies와 데이터 의존성",
            "seconds": 823,
            "video": true
          },
          {
            "id": "350108",
            "title": "TaskGroup을 활용한 복잡한 워크플로우 설계",
            "seconds": 650,
            "video": true
          },
          {
            "id": "350109",
            "title": "재사용 가능한 Custom Operator",
            "seconds": 303,
            "video": true
          },
          {
            "id": "355198",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "350110",
        "title": "Airflow에서의 병렬처리 및 분산 처리와 대용량 재처리",
        "units": [
          {
            "id": "350111",
            "title": "Airlfow의 병렬 처리와 분산 처리 전략",
            "seconds": 636,
            "video": true
          },
          {
            "id": "350112",
            "title": "Backfill 전략과 대량 데이터 재처리",
            "seconds": 308,
            "video": true
          }
        ]
      },
      {
        "id": "350113",
        "title": "Python & Docker를 활용한 경량 환경 구축",
        "units": [
          {
            "id": "350114",
            "title": "Docker를 활용한 경량 환경구축",
            "seconds": 990,
            "video": true
          },
          {
            "id": "350115",
            "title": "python을 활용한 기본적인 실습환경 구성하기",
            "seconds": 297,
            "video": true
          }
        ]
      },
      {
        "id": "350116",
        "title": "실전!! 실습하며 다루는 Airflow",
        "units": [
          {
            "id": "350117",
            "title": "Dynamic DAG 생성 패턴",
            "seconds": 1621,
            "video": true
          },
          {
            "id": "350118",
            "title": "TriggerDagRun & TaskSensor 의존 관계 실습",
            "seconds": 1127,
            "video": true
          },
          {
            "id": "350119",
            "title": "Airflow에서 EDA 패턴 Dataset Dependencies 활용 패턴",
            "seconds": 573,
            "video": true
          },
          {
            "id": "350120",
            "title": "TaskGroup을 적용한 그룹화 패턴",
            "seconds": 592,
            "video": true
          },
          {
            "id": "350121",
            "title": "Airflow의 캡슐 추상화 데코레이터 & Custom Operator 패턴",
            "seconds": 482,
            "video": true
          },
          {
            "id": "350122",
            "title": "배치 처리에서 병렬 처리 패턴을 도입한 처리량 향상 패턴",
            "seconds": 490,
            "video": true
          },
          {
            "id": "355200",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "351361",
        "title": "여러분들이 아셨으면 좋은 Airflow 추가 실습",
        "units": [
          {
            "id": "351362",
            "title": "Slack을 활용한 Notification 구현",
            "seconds": 1090,
            "video": true
          },
          {
            "id": "351363",
            "title": "Celery Executor를 활용한 대용량 배치작업 분산처리",
            "seconds": 424,
            "video": true
          },
          {
            "id": "351364",
            "title": "Celery Executor, Redis 분산 처리를 활용한 배치 처리 실습",
            "seconds": 576,
            "video": true
          },
          {
            "id": "355201",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "29": {
    "title": "클로드로 딸깍! 루프 엔지니어링으로 통합 자산관리 시스템 개발하기",
    "url": "https://www.inflearn.com/course/one-click-with-claud",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-07-06 07:46:00",
    "totalSeconds": 47672,
    "totalUnits": 15,
    "sections": [
      {
        "id": "464445",
        "title": "개발환경 구축 및 Claude Code 활용을 위한 기초이론",
        "units": [
          {
            "id": "464446",
            "title": "효과적인 바이브 코딩 개발환경 구축",
            "seconds": 3081,
            "video": true
          },
          {
            "id": "464447",
            "title": "Claude Code 사용방법 핵심요약",
            "seconds": 3317,
            "video": true
          },
          {
            "id": "464448",
            "title": "Next.js + Spring Boot + PostgreSQL 기반 Todolist (CRUD)",
            "seconds": 3188,
            "video": true
          },
          {
            "id": "464449",
            "title": "바이브 코더가 알아야 할 상식의 최소한",
            "seconds": 3548,
            "video": true
          },
          {
            "id": "464450",
            "title": "바이브 코더가 알아야 할 웹 서비스 작동 구조",
            "seconds": 4007,
            "video": true
          },
          {
            "id": "467709",
            "title": "강의자료 PDF",
            "seconds": 0,
            "video": false
          },
          {
            "id": "467710",
            "title": "강의자료 PDF - 인쇄용",
            "seconds": 0,
            "video": false
          },
          {
            "id": "464515",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464451",
        "title": "Claude AI 본격 활용",
        "units": [
          {
            "id": "464452",
            "title": "AI의 오지랖을 통제하는 방법과 TDD에 관한 용어이해",
            "seconds": 3238,
            "video": true
          },
          {
            "id": "464453",
            "title": "역할별 AI모델 선택과 Loop engineering",
            "seconds": 2655,
            "video": true
          },
          {
            "id": "464454",
            "title": "Claude AI 모델(Fable 5, Opus 4.8, Sonnet 4.6, Haiku) 프로젝트 수행 결과",
            "seconds": 3300,
            "video": true
          },
          {
            "id": "464455",
            "title": "Todolist 프로젝트 재설계 및 QA 테스트 자동화 (크롬 브라우저 MCP 연동)",
            "seconds": 5135,
            "video": true
          },
          {
            "id": "464514",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464456",
        "title": "통합 자산관리 시스템 개발",
        "units": [
          {
            "id": "464457",
            "title": "2시간 마라톤 회의! 통합 자산관리 시스템 설계 (※ 수업자료 포함)",
            "seconds": 6993,
            "video": true
          },
          {
            "id": "464458",
            "title": "MinIO 설치와 카카오맵 설정 그리고 Sidabari4loop를 이용한 딸깍! 개발",
            "seconds": 3086,
            "video": true
          },
          {
            "id": "464459",
            "title": "개발결과 확인 및 테스트 그리고 각종 질문에 대한 답변",
            "seconds": 3314,
            "video": true
          },
          {
            "id": "464460",
            "title": "결과물 UI 개선 및 종강",
            "seconds": 2810,
            "video": true
          },
          {
            "id": "464513",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "3": {
    "title": "개발자라면 꼭 알아야할 시스템디자인 완벽가이드",
    "url": "https://www.inflearn.com/course/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC%ED%95%A0-%EC%8B%9C%EC%8A%A4%ED%85%9C%EB%94%94%EC%9E%90%EC%9D%B8",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-23 23:34:56",
    "totalSeconds": 14375,
    "totalUnits": 41,
    "sections": [
      {
        "id": "389256",
        "title": "개요",
        "units": [
          {
            "id": "389257",
            "title": "개요",
            "seconds": 101,
            "video": true
          },
          {
            "id": "401707",
            "title": "시스템디자인의 중요성",
            "seconds": 162,
            "video": true
          },
          {
            "id": "403696",
            "title": "장애가 나지 않는 시스템이 존재할까?",
            "seconds": 99,
            "video": true
          },
          {
            "id": "403697",
            "title": "학습 가이드 (필독)",
            "seconds": 106,
            "video": true
          },
          {
            "id": "415115",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "394698",
        "title": "시스템디자인 핵심 개념",
        "units": [
          {
            "id": "394700",
            "title": "레이턴시 (Latency)",
            "seconds": 554,
            "video": true
          },
          {
            "id": "395346",
            "title": "스루풋 (Throughput)",
            "seconds": 146,
            "video": true
          },
          {
            "id": "394713",
            "title": "수평확장 vs 수직확장 (Vertical vs Horizontal Scaling)",
            "seconds": 248,
            "video": true
          },
          {
            "id": "395320",
            "title": "로드밸런싱 (Load Balancing)",
            "seconds": 271,
            "video": true
          },
          {
            "id": "395321",
            "title": "분산시스템 (Distributed System)",
            "seconds": 427,
            "video": true
          },
          {
            "id": "395322",
            "title": "CAP 이론 (CAP Theorem)",
            "seconds": 684,
            "video": true
          },
          {
            "id": "395323",
            "title": "장애조치 (Failover)",
            "seconds": 435,
            "video": true
          },
          {
            "id": "395324",
            "title": "정족수 (Quorum)",
            "seconds": 454,
            "video": true
          },
          {
            "id": "415116",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "396062",
        "title": "시스템간 통신",
        "units": [
          {
            "id": "396063",
            "title": "HTTP",
            "seconds": 686,
            "video": true
          },
          {
            "id": "396064",
            "title": "TCP/UDP",
            "seconds": 556,
            "video": true
          },
          {
            "id": "396065",
            "title": "API 설계 (API Design)",
            "seconds": 801,
            "video": true
          },
          {
            "id": "396066",
            "title": "API 프록시 (API Proxy)",
            "seconds": 211,
            "video": true
          },
          {
            "id": "396067",
            "title": "API 회복 탄력성 (API Resilience)",
            "seconds": 886,
            "video": true
          },
          {
            "id": "415114",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "396068",
        "title": "데이터베이스",
        "units": [
          {
            "id": "396069",
            "title": "트랜잭션 (Transaction)",
            "seconds": 126,
            "video": true
          },
          {
            "id": "396070",
            "title": "ACID 원칙 (ACID Principles)",
            "seconds": 302,
            "video": true
          },
          {
            "id": "396071",
            "title": "격리수준 (Isolation Level)",
            "seconds": 600,
            "video": true
          },
          {
            "id": "396072",
            "title": "인덱싱 (Indexing)",
            "seconds": 453,
            "video": true
          },
          {
            "id": "396073",
            "title": "레플리케이션 (Replication)",
            "seconds": 347,
            "video": true
          },
          {
            "id": "396074",
            "title": "파티셔닝/샤딩 (Partioning/Sharding)",
            "seconds": 339,
            "video": true
          },
          {
            "id": "396075",
            "title": "NoSQL - 종류와 사례",
            "seconds": 421,
            "video": true
          },
          {
            "id": "396076",
            "title": "데이터 저장소 성격",
            "seconds": 150,
            "video": true
          },
          {
            "id": "396077",
            "title": "데이터베이스 선택기준",
            "seconds": 172,
            "video": true
          },
          {
            "id": "415113",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "396078",
        "title": "캐시",
        "units": [
          {
            "id": "396079",
            "title": "캐시 (Cache)",
            "seconds": 469,
            "video": true
          },
          {
            "id": "396080",
            "title": "지역성 (Locality)",
            "seconds": 144,
            "video": true
          },
          {
            "id": "396081",
            "title": "캐시 패턴 (Cache Pattern)",
            "seconds": 196,
            "video": true
          },
          {
            "id": "396082",
            "title": "CDN (Content Delivery Network)",
            "seconds": 219,
            "video": true
          },
          {
            "id": "396083",
            "title": "캐시 설계시 고려할 문제",
            "seconds": 512,
            "video": true
          },
          {
            "id": "415112",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "396084",
        "title": "메세지 큐",
        "units": [
          {
            "id": "396085",
            "title": "메세지 큐 (Message Queue)",
            "seconds": 186,
            "video": true
          },
          {
            "id": "396086",
            "title": "메세지 큐 처리 방식",
            "seconds": 381,
            "video": true
          },
          {
            "id": "398590",
            "title": "메세지 큐 사용사례",
            "seconds": 154,
            "video": true
          },
          {
            "id": "415111",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "398591",
        "title": "빅데이터",
        "units": [
          {
            "id": "398592",
            "title": "빅데이터 (Big Data)",
            "seconds": 270,
            "video": true
          },
          {
            "id": "398593",
            "title": "OLTP vs OLAP",
            "seconds": 257,
            "video": true
          },
          {
            "id": "398594",
            "title": "분산 처리 시스템 (Distributed System)",
            "seconds": 660,
            "video": true
          },
          {
            "id": "398595",
            "title": "배치 처리 vs 스트림 처리 (Batch vs Streaming Process)",
            "seconds": 656,
            "video": true
          },
          {
            "id": "398596",
            "title": "데이터 거버넌스 (Data Governance)",
            "seconds": 422,
            "video": true
          },
          {
            "id": "415117",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "398597",
        "title": "모니터링",
        "units": [
          {
            "id": "398598",
            "title": "모니터링 (Monitoring)",
            "seconds": 112,
            "video": true
          },
          {
            "id": "398599",
            "title": "주요 모니터링 지표",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "34": {
    "title": "[취업폭격기] 사기업 IT취업 치트키 : 서류·포트폴리오·커리어까지 한 번에 뚫는 정규과정",
    "url": "https://www.inflearn.com/course/job-bomber-private-s",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-09-03 21:42:26",
    "totalSeconds": 22153,
    "totalUnits": 15,
    "sections": [
      {
        "id": "456226",
        "title": "🎥 [취업폭격기] 사기업 IT 취업 치트키 - 강의 소개 영상",
        "units": [
          {
            "id": "456227",
            "title": "0강. 강의 소개",
            "seconds": 558,
            "video": true
          }
        ]
      },
      {
        "id": "455492",
        "title": "[SECTION 1] 타겟팅 & 전략: 적을 알고 나를 안다",
        "units": [
          {
            "id": "472154",
            "title": "0강. 강의 신청 특전 안내 (디스코드, Github, 커피챗 신청방법)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "455493",
            "title": "1강. 사기업 IT 채용 트렌드와 '진짜' 커리어 로드맵 설계",
            "seconds": 2446,
            "video": true
          },
          {
            "id": "459104",
            "title": "1-1강. ADR & RFC 보충 설명 자료",
            "seconds": 1197,
            "video": true
          },
          {
            "id": "456215",
            "title": "2강. JD(직무기술서) 정밀 타격: 목표 기업이 원하는 '핏(Fit)' 해석법",
            "seconds": 2687,
            "video": true
          },
          {
            "id": "459111",
            "title": "2-1강. 경험정리 하는 방법 (과거 강의 영상)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "456216",
            "title": "3강. 스펙을 뛰어넘는 무기: 하이엔드 대외활동(소마 · BoB) 레버리지",
            "seconds": 1675,
            "video": true
          },
          {
            "id": "472323",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "456217",
        "title": "[SECTION 2] 서류 & 포트폴리오: 시장에 나를 세일즈하다",
        "units": [
          {
            "id": "456218",
            "title": "4강. 인사담당자와 리드 개발자를 모두 홀리는 IT 자소서 작성법",
            "seconds": 1349,
            "video": true
          },
          {
            "id": "456219",
            "title": "5강. GitHub와 Notion 포트폴리오의 정석: \"ReadMe만 봐도 합격\"",
            "seconds": 1506,
            "video": true
          },
          {
            "id": "456220",
            "title": "6강. 기술적 트러블슈팅(Troubleshooting) 시각화 기법",
            "seconds": 1047,
            "video": true
          },
          {
            "id": "456221",
            "title": "7강. 서류 통과율을 2배 높이는 '이력서 커스텀' 테크닉",
            "seconds": 1922,
            "video": true
          },
          {
            "id": "472321",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "456222",
        "title": "[SECTION 3] 히든 카드 & 실전: 인맥과 면접으로 쐐기 박기",
        "units": [
          {
            "id": "456223",
            "title": "8강. 사기업 취업의 숨겨진 치트키: '링크드인'과 커피챗을 통한 IT 네트워킹",
            "seconds": 2280,
            "video": true
          },
          {
            "id": "456224",
            "title": "9강. 포트폴리오 기반 기술 면접 타격법: 내가 짠 판으로 면접관 끌고 오기",
            "seconds": 1351,
            "video": true
          },
          {
            "id": "456225",
            "title": "10강. 최종 합격을 완성하는 커리어 방향성과 연봉 협상 전략",
            "seconds": 2063,
            "video": true
          },
          {
            "id": "472322",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "491321",
        "title": "[SECTION ETC] 공공기관 & 사기업 주간 세미나",
        "units": [
          {
            "id": "491328",
            "title": "26.08.30 주간세미나 (한국부동산원 최근 3년 IT방향 등 사업분석)",
            "seconds": 2072,
            "video": true
          }
        ]
      }
    ]
  },
  "8": {
    "title": "[취업폭격기] 공공기관 전산직 취업 치트키 : NCS·전공·PT면접까지 한 번에 뚫는 정규과정",
    "url": "https://www.inflearn.com/course/%EC%B7%A8%EC%97%85%ED%8F%AD%EA%B2%A9%EA%B8%B0-%EC%A0%84%EC%82%B0%EC%A7%81-%EC%B7%A8%EC%97%85%EC%A4%80%EB%B9%84",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-09-03 21:40:18",
    "totalSeconds": 86871,
    "totalUnits": 30,
    "sections": [
      {
        "id": "174976",
        "title": "[서류전형] 공공기관 전산직(IT) 준비 기초과정 (4강)",
        "units": [
          {
            "id": "174977",
            "title": "공공기관 전산직(IT) 취업 전략! 정규과정 소개",
            "seconds": 809,
            "video": true
          },
          {
            "id": "174984",
            "title": "기초 취업 마인드셋 정립하기",
            "seconds": 2322,
            "video": true
          },
          {
            "id": "174985",
            "title": "경험 정리 하는 방법",
            "seconds": 2279,
            "video": true
          },
          {
            "id": "174986",
            "title": "목표기업 분석하기",
            "seconds": 2880,
            "video": true
          },
          {
            "id": "174987",
            "title": "자기소개서 작성하기",
            "seconds": 2437,
            "video": true
          },
          {
            "id": "295054",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "174988",
        "title": "[필기전형] 공공기관 전산직(IT) 준비 중급과정 (3강)",
        "units": [
          {
            "id": "174993",
            "title": "필기 학습 방법 (공기업, NCS, 전공)",
            "seconds": 2367,
            "video": true
          },
          {
            "id": "174994",
            "title": "공기업 코딩테스트 학습 방법",
            "seconds": 1715,
            "video": true
          },
          {
            "id": "174995",
            "title": "논술 시험 학습 방법 (전공-금융-시사)",
            "seconds": 1164,
            "video": true
          },
          {
            "id": "295230",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "174996",
        "title": "[면접전형] 공공기관 전산직(IT) 준비 고급과정 (3강)",
        "units": [
          {
            "id": "174997",
            "title": "전산직(IT) 면접 기본 준비사항",
            "seconds": 1308,
            "video": true
          },
          {
            "id": "174998",
            "title": "경험/상황 면접 준비방법",
            "seconds": 2137,
            "video": true
          },
          {
            "id": "174999",
            "title": "토론/발표 면접 준비방법",
            "seconds": 1254,
            "video": true
          },
          {
            "id": "295357",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "182456",
        "title": "[참고 영상] 주간 취업 세미나 영상",
        "units": [
          {
            "id": "182457",
            "title": "23.09.10 주간세미나 (Data Analyst, Data Engineer 직무 이해 + RoadMAP)",
            "seconds": 3527,
            "video": true
          },
          {
            "id": "183827",
            "title": "23.09.17 주간세미나 (한국도로공사(2차면접), 한국거래소(1차면접) 리뷰)",
            "seconds": 725,
            "video": true
          },
          {
            "id": "185316",
            "title": "23.09.24 주간세미나 (금융IT컴플라이언스 소개 및 관련 직무 간략 Talk)",
            "seconds": 1706,
            "video": true
          },
          {
            "id": "187085",
            "title": "23.10.07 주간세미나 (한국부동산원, 국민연금공단 면접 리뷰 및 기업분석 양식 소개)",
            "seconds": 2572,
            "video": true
          },
          {
            "id": "194425",
            "title": "23.11.18 유튜브 온라인 세미나 ('24년도 상반기 공기업 전산직 취업전략)",
            "seconds": 3641,
            "video": true
          },
          {
            "id": "196979",
            "title": "23.12.03 주간세미나 (Network Infra 기초)",
            "seconds": 2916,
            "video": true
          },
          {
            "id": "200531",
            "title": "23.12.31 주간세미나 (전산(IT) 업무의 과정 [국정과제-공무원-공기업-입찰업체-하도급])",
            "seconds": 1970,
            "video": true
          },
          {
            "id": "202114",
            "title": "24.01.07 주간세미나 (소프트웨어 발주절차, 소프트웨어 단가산정 방법 숲보기)",
            "seconds": 2708,
            "video": true
          },
          {
            "id": "491315",
            "title": "26.08.30 주간세미나 (한국부동산원 최근 3년 IT방향 등 사업분석)",
            "seconds": 2072,
            "video": true
          },
          {
            "id": "295529",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "315089",
        "title": "[전산직 이해] 공공기관 전산직 업무 소개",
        "units": [
          {
            "id": "315090",
            "title": "[1차] - IT인프라관리 및 IT기획 업무",
            "seconds": 5269,
            "video": true
          },
          {
            "id": "315091",
            "title": "[2차] - 정보보안 업무",
            "seconds": 5069,
            "video": true
          },
          {
            "id": "315092",
            "title": "[3차] - 소프트웨어(SW) 발주 및 개발 업무",
            "seconds": 5309,
            "video": true
          },
          {
            "id": "315093",
            "title": "[4차] - 데이터분석 및 인공지능(A.I) 관련 업무",
            "seconds": 5116,
            "video": true
          },
          {
            "id": "315094",
            "title": "[5차] - 공공기관 특수시스템 I",
            "seconds": 5280,
            "video": true
          },
          {
            "id": "315095",
            "title": "[6차] - 공공기관 특수시스템 II",
            "seconds": 4010,
            "video": true
          },
          {
            "id": "315099",
            "title": "[6차 - 1] - 공공기관 특수시스템 II",
            "seconds": 609,
            "video": true
          },
          {
            "id": "315096",
            "title": "[7차] - 공공기관 특수시스템 III",
            "seconds": 5806,
            "video": true
          },
          {
            "id": "315097",
            "title": "[8차] - 공공기관 특수시스템 IV",
            "seconds": 4555,
            "video": true
          },
          {
            "id": "315100",
            "title": "[9차] - 공공기관 특수시스템 최종",
            "seconds": 3339,
            "video": true
          }
        ]
      }
    ]
  },
  "22": {
    "title": "가장 쉬운 동시성 문제 - Race Condition",
    "url": "https://www.inflearn.com/course/%EA%B0%80%EC%9E%A5-%EC%89%AC%EC%9A%B4-%EB%8F%99%EC%8B%9C%EC%84%B1-%EB%AC%B8%EC%A0%9C-race-co",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-11-18 06:32:22",
    "totalSeconds": 14073,
    "totalUnits": 25,
    "sections": [
      {
        "id": "367369",
        "title": "강의 목표와 실습 환경",
        "units": [
          {
            "id": "367370",
            "title": "강의 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "367381",
            "title": "강의 목표와 실습 환경",
            "seconds": 187,
            "video": true
          }
        ]
      },
      {
        "id": "367380",
        "title": "Concurrency Issue 살펴보기",
        "units": [
          {
            "id": "367382",
            "title": "Concurrency Issue 살펴보기",
            "seconds": 181,
            "video": true
          }
        ]
      },
      {
        "id": "367407",
        "title": "Race Condtion 실습 (1) - 공유 변수",
        "units": [
          {
            "id": "367389",
            "title": "실습 환경 만들기",
            "seconds": 939,
            "video": true
          },
          {
            "id": "367383",
            "title": "공유 변수에 사용하는 synchrozied, ReentrantLock",
            "seconds": 601,
            "video": true
          },
          {
            "id": "367384",
            "title": "Atomic 클래스",
            "seconds": 468,
            "video": true
          },
          {
            "id": "368157",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "367409",
        "title": "Race Condtion 실습 (2) - 공유 Database",
        "units": [
          {
            "id": "367386",
            "title": "실습 환경 만들기 - 프로젝트 설정",
            "seconds": 447,
            "video": true
          },
          {
            "id": "367388",
            "title": "실습 환경 만들기 - 코드 작성",
            "seconds": 718,
            "video": true
          },
          {
            "id": "367387",
            "title": "공유 DB에 사용하는 syncronized, ReentrantLock",
            "seconds": 345,
            "video": true
          },
          {
            "id": "367385",
            "title": "Transactional 애노테이션 이해하기",
            "seconds": 494,
            "video": true
          },
          {
            "id": "367400",
            "title": "Transactional 애노테이션과 함께 사용하는 syncronized, ReentrantLock",
            "seconds": 720,
            "video": true
          },
          {
            "id": "367390",
            "title": "트랜잭션 격리 수준 이해하기",
            "seconds": 499,
            "video": true
          },
          {
            "id": "367399",
            "title": "트랜잭션 격리 수준 설정으로 동시성 문제 해결하기",
            "seconds": 1048,
            "video": true
          },
          {
            "id": "367396",
            "title": "낙관적 락으로 동시성 문제 해결하기",
            "seconds": 1357,
            "video": true
          },
          {
            "id": "367398",
            "title": "비관적 락으로 동시성 문제 해결하기",
            "seconds": 707,
            "video": true
          },
          {
            "id": "367391",
            "title": "비관적 락에 사용하는 옵션에 대한 설명",
            "seconds": 286,
            "video": true
          },
          {
            "id": "367397",
            "title": "비교 및 정리",
            "seconds": 906,
            "video": true
          },
          {
            "id": "368158",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "367406",
        "title": "Race Condtion 실습 (3) - 분산 환경",
        "units": [
          {
            "id": "367394",
            "title": "분산 환경에서 syncronized, ReentrantLock 사용하기",
            "seconds": 708,
            "video": true
          },
          {
            "id": "367395",
            "title": "분산 환경에서 낙관적 락과 비관적 락 사용하기",
            "seconds": 581,
            "video": true
          },
          {
            "id": "367392",
            "title": "Redisson을 사용한 분산 락 준비하기",
            "seconds": 517,
            "video": true
          },
          {
            "id": "367393",
            "title": "Redisson을 사용한 분산 락 사용하기",
            "seconds": 480,
            "video": true
          },
          {
            "id": "367404",
            "title": "분산 락은 꼭 필요한가요?",
            "seconds": 83,
            "video": true
          },
          {
            "id": "367402",
            "title": "낙관적 락으로 해결할 수 없는 상황",
            "seconds": 826,
            "video": true
          },
          {
            "id": "367403",
            "title": "비관적 락으로 해결할 수 없는 상황",
            "seconds": 687,
            "video": true
          },
          {
            "id": "368160",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "367410",
        "title": "마치며",
        "units": [
          {
            "id": "368176",
            "title": "마치며 🙇",
            "seconds": 288,
            "video": true
          }
        ]
      }
    ]
  },
  "extra-java": {
    "title": "[CS 기술면접 6] 말이 트이는 자바와 객체지향",
    "url": "https://www.inflearn.com/course/java-and-object-orie",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-06-03 17:37:31",
    "totalSeconds": 11205,
    "totalUnits": 33,
    "sections": [
      {
        "id": "336138",
        "title": "INTRO: 강의 소개 및 목차 살펴보기",
        "units": [
          {
            "id": "336139",
            "title": "강의 소개 및 목차 살펴보기",
            "seconds": 195,
            "video": true
          },
          {
            "id": "336140",
            "title": "강의 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "373919",
            "title": "기술면접 실전 워크북 소개 영상",
            "seconds": 443,
            "video": true
          },
          {
            "id": "373920",
            "title": "기술면접 실전 워크북 PDF",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336141",
        "title": "객체 지향 설계 원리와 패턴",
        "units": [
          {
            "id": "336149",
            "title": "객체 지향의 특징 — 객체 지향이 만든 차별화된 설계 방식",
            "seconds": 553,
            "video": true
          },
          {
            "id": "336150",
            "title": "SOLID 원칙 — 유연하고 확장 가능한 코드를 위한 5가지 원칙",
            "seconds": 1047,
            "video": true
          },
          {
            "id": "454882",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336142",
        "title": "자바 핵심 구조와 메모리 메커니즘",
        "units": [
          {
            "id": "336151",
            "title": "자바의 특징 — 플랫폼 독립성과 강력한 라이브러리의 비밀",
            "seconds": 98,
            "video": true
          },
          {
            "id": "336152",
            "title": "JVM — 자바 가상머신의 구조와 실행 메커니즘",
            "seconds": 762,
            "video": true
          },
          {
            "id": "336153",
            "title": "가비지 컬렉터 — GC 동작 원리와 메모리 관리 전략",
            "seconds": 971,
            "video": true
          },
          {
            "id": "336154",
            "title": "기본형과 참조형 타입의 차이 — 데이터 저장 방식과 메모리 관점 비교",
            "seconds": 489,
            "video": true
          },
          {
            "id": "336155",
            "title": "Call by Value vs Reference — 자바 호출 방식의 진실",
            "seconds": 465,
            "video": true
          },
          {
            "id": "336156",
            "title": "자바의 접근 제어자 — 캡슐화와 보안성을 높이는 설계 키워드",
            "seconds": 128,
            "video": true
          },
          {
            "id": "336157",
            "title": "static 키워드 — 클래스 레벨 자원의 효율적 활용",
            "seconds": 183,
            "video": true
          },
          {
            "id": "454883",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "336778",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336143",
        "title": "자바와 객체 지향 프로그래밍 심화(OOP)",
        "units": [
          {
            "id": "336158",
            "title": "자바의 OOP — 객체 지향 프로그래밍의 자바 구현 방식",
            "seconds": 200,
            "video": true
          },
          {
            "id": "336159",
            "title": "다형성 — 하나의 인터페이스, 무한한 구현 가능성",
            "seconds": 557,
            "video": true
          },
          {
            "id": "336160",
            "title": "final 키워드 — 불변성과 안정성을 보장하는 키워드 활용법",
            "seconds": 82,
            "video": true
          },
          {
            "id": "336161",
            "title": "인터페이스와 추상 클래스 — 유연한 설계의 핵심 도구 비교",
            "seconds": 252,
            "video": true
          },
          {
            "id": "454884",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "336776",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336144",
        "title": "컬렉션 프레임워크 완전 정복",
        "units": [
          {
            "id": "336162",
            "title": "List, Set, Map — 컬렉션 3대장 구조와 특징 이해",
            "seconds": 234,
            "video": true
          },
          {
            "id": "336163",
            "title": "다양한 Set 비교 — HashSet, LinkedHashSet, TreeSet의 특성과 활용",
            "seconds": 277,
            "video": true
          },
          {
            "id": "336164",
            "title": "다양한 Map 비교 — HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap의 차이와 선택 기준",
            "seconds": 276,
            "video": true
          },
          {
            "id": "454885",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "336775",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336145",
        "title": "멀티스레딩과 동시성 프로그래밍",
        "units": [
          {
            "id": "336165",
            "title": "멀티스레딩 구현 방법 — 다중 작업 처리를 위한 스레드 구현 전략",
            "seconds": 738,
            "video": true
          },
          {
            "id": "336166",
            "title": "synchronized 키워드 — 스레드 안전성과 동기화의 핵심",
            "seconds": 468,
            "video": true
          },
          {
            "id": "336167",
            "title": "volatile 키워드 — 가시성과 메모리 일관성 보장하기",
            "seconds": 404,
            "video": true
          },
          {
            "id": "454886",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "336779",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336146",
        "title": "예외 처리와 고급 자바 기법",
        "units": [
          {
            "id": "336168",
            "title": "예외 처리 방법 — 안정적인 코드 작성을 위한 예외 처리 전략",
            "seconds": 133,
            "video": true
          },
          {
            "id": "373921",
            "title": "예외 계층 구조 알아보기",
            "seconds": 268,
            "video": true
          },
          {
            "id": "373922",
            "title": "checked exception과 unchecked exception 차이 알아보기",
            "seconds": 253,
            "video": true
          },
          {
            "id": "336169",
            "title": "직렬화와 역직렬화 — 객체의 저장과 전송을 가능하게 하는 기술",
            "seconds": 139,
            "video": true
          },
          {
            "id": "336170",
            "title": "이중 등호와 equals 차이 — 객체 비교의 정확한 이해",
            "seconds": 115,
            "video": true
          },
          {
            "id": "336171",
            "title": "String, StringBuffer, StringBuilder 비교 — 문자열 처리 성능과 선택 기준",
            "seconds": 146,
            "video": true
          },
          {
            "id": "336172",
            "title": "annotation — 메타데이터로 코드를 유연하게 확장하는 방법",
            "seconds": 134,
            "video": true
          },
          {
            "id": "454887",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "336777",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336147",
        "title": "모던 자바: Java 8+ 기능과 활용",
        "units": [
          {
            "id": "336173",
            "title": "함수형 인터페이스와 람다식 — 자바에서의 함수형 프로그래밍 시작하기",
            "seconds": 268,
            "video": true
          },
          {
            "id": "336174",
            "title": "컬렉션과 Stream API 비교 — 데이터 처리 방식의 진화",
            "seconds": 295,
            "video": true
          },
          {
            "id": "454888",
            "title": "실전 훈련",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "336148",
        "title": "부록 [인터뷰 연습]",
        "units": [
          {
            "id": "336175",
            "title": "부록: 인터뷰 연습 — 자바 심화 개념 면접 대비 실전 문제",
            "seconds": 632,
            "video": true
          }
        ]
      }
    ]
  },
  "18": {
    "title": "카카오 면접관의 실무 밀착형 Spring Batch: 대용량 데이터 처리의 모든 것",
    "url": "https://www.inflearn.com/course/kakao-interviewers-p",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-04-05 12:18:43",
    "totalSeconds": 19452,
    "totalUnits": 24,
    "sections": [
      {
        "id": "421770",
        "title": "강의 소개",
        "units": [
          {
            "id": "421771",
            "title": "강의 소개",
            "seconds": 352,
            "video": true
          },
          {
            "id": "427665",
            "title": "Source Code",
            "seconds": 0,
            "video": false
          },
          {
            "id": "431762",
            "title": "Spring Batch Docs",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "427664",
        "title": "금융, 이커머스, AI등 다양한 도메인에서 배치처리가 왜 필요할까",
        "units": [
          {
            "id": "427642",
            "title": "여러분들은 배치처리를 뭐라고 생각하시나요",
            "seconds": 681,
            "video": true
          },
          {
            "id": "427643",
            "title": "Spring Batch가 제공하는 그 생태계만의 아키텍처",
            "seconds": 724,
            "video": true
          },
          {
            "id": "427644",
            "title": "강의 실습을 위한 Spring Initializr를 통한 구성 및 빌드 설정",
            "seconds": 557,
            "video": true
          },
          {
            "id": "431780",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "427666",
        "title": "Spring Batch에 대한 핵심적인 기본 개념",
        "units": [
          {
            "id": "427645",
            "title": "첫번쨰 Job과 Step 함께 작성하며 실행 및 DB 상태 확인하기",
            "seconds": 996,
            "video": true
          },
          {
            "id": "427646",
            "title": "조용히 뒤에서 작업하는 인프라 객체 JobRepository와 JobLanucher 그리고 ExecutionContext",
            "seconds": 1357,
            "video": true
          },
          {
            "id": "427647",
            "title": "Tasklet Step 인터페이스 집중 분석과 커스텀 Tasklet 구현",
            "seconds": 934,
            "video": true
          },
          {
            "id": "427648",
            "title": "대용량 데이터 처리를 위한 Chunk-Oriented Step 패턴과 트랜잭션 상관관계",
            "seconds": 1169,
            "video": true
          },
          {
            "id": "431786",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "427667",
        "title": "Spring Batch의 워크플로우 : Read + Processor + Writer 패턴",
        "units": [
          {
            "id": "427649",
            "title": "JdbcCursorItemReader와 JdbcPagingItemReader를 활용한 청크 데이터 처리 패턴",
            "seconds": 1430,
            "video": true
          },
          {
            "id": "427650",
            "title": "Spring Batch의 처리 과정에서 Mapper를 수행하는 Processor",
            "seconds": 958,
            "video": true
          },
          {
            "id": "427651",
            "title": "ReadWriter의 대표 스펙 JdbcBatchItemWriter와 JPA 방식의 JpaItemWriter",
            "seconds": 1101,
            "video": true
          },
          {
            "id": "427652",
            "title": "JobParameters의 이해와 활용 그리고 Spring의 Bean 생명주기와의 연관성",
            "seconds": 799,
            "video": true
          },
          {
            "id": "427653",
            "title": "Spring Scheduler를 활용한 배치 스케줄링 패턴",
            "seconds": 849,
            "video": true
          },
          {
            "id": "431783",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "427641",
        "title": "Spring Batch의 내결함성 및 트러블 슈팅을 위한 Optional 패턴",
        "units": [
          {
            "id": "427654",
            "title": "Step 체이닝간 순차 실행과 조건 분기 패턴 및 데이터 스트림 처리",
            "seconds": 1591,
            "video": true
          },
          {
            "id": "427655",
            "title": "Split를 활용한 병렬 처리 패턴",
            "seconds": 693,
            "video": true
          },
          {
            "id": "427656",
            "title": "Job 생명주기에 끼어들어 관찰가능한 Listener 패턴",
            "seconds": 844,
            "video": true
          },
          {
            "id": "427657",
            "title": "청크 단위와 아이템 단위로 상황을 추적하는 ChunkListener 패턴",
            "seconds": 918,
            "video": true
          },
          {
            "id": "427658",
            "title": "Spring Batch의 내결함성을 확보하기 위한 Skip 처리 패턴",
            "seconds": 703,
            "video": true
          },
          {
            "id": "427659",
            "title": "배치 작업에 대한 회복성을 부여하기 위한 Retry 패턴",
            "seconds": 609,
            "video": true
          },
          {
            "id": "431782",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "427660",
        "title": "성능 향상의 핵심!! Spring Batch의 3가지 병렬 처리 패턴",
        "units": [
          {
            "id": "427661",
            "title": "하나의 Reader를 공유하며 병렬처리를 제공하는 Multi Threaded Step",
            "seconds": 643,
            "video": true
          },
          {
            "id": "427662",
            "title": "Partitioning을 활용한 데이터 병렬 분할 처리 패턴",
            "seconds": 834,
            "video": true
          },
          {
            "id": "427663",
            "title": "메인과 서브를 분리하여 트랜잭션 일관성을 지겨주는 병렬 처리 방식 AsyncItemProcessor",
            "seconds": 710,
            "video": true
          },
          {
            "id": "431785",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "extra-load-test": {
    "title": "대규모 트래픽 처리를 위한 부하테스트 입문/실전",
    "url": "https://www.inflearn.com/course/%EB%8C%80%EA%B7%9C%EB%AA%A8%ED%8A%B8%EB%9E%98%ED%94%BD-%EB%B6%80%ED%95%98%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9E%85%EB%AC%B8-%EC%8B%A4%EC%A0%84",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-30 20:26:38",
    "totalSeconds": 12454,
    "totalUnits": 44,
    "sections": [
      {
        "id": "257882",
        "title": "꼭!꼭! 들어봐야 하는 오리엔테이션🦆",
        "units": [
          {
            "id": "257883",
            "title": "강의 소개",
            "seconds": 151,
            "video": true
          },
          {
            "id": "257889",
            "title": "소통하면서 듣는 인터넷 강의?!",
            "seconds": 111,
            "video": true
          },
          {
            "id": "257890",
            "title": "[학습 Tip] 강의를 다 듣고나서 스스로 구현할 수 있으려면?",
            "seconds": 197,
            "video": true
          },
          {
            "id": "412638",
            "title": "[공지] 강의 자료 저작권 관련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "257891",
            "title": "[학습 Tip] 파레토의 법칙",
            "seconds": 118,
            "video": true
          },
          {
            "id": "257892",
            "title": "[학습 Tip] First Word 법칙",
            "seconds": 77,
            "video": true
          },
          {
            "id": "257893",
            "title": "[학습 Tip] 주석 공부법",
            "seconds": 138,
            "video": true
          },
          {
            "id": "257894",
            "title": "1:1 오픈 톡방(질문) / 마음의 소리함",
            "seconds": 0,
            "video": false
          },
          {
            "id": "257895",
            "title": "수업 자료 (Notion)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "315316",
            "title": "수업 자료 (PDF)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "294483",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "257885",
        "title": "부하 테스트의 기본 개념",
        "units": [
          {
            "id": "257896",
            "title": "취준생이 대규모 트래픽 처리 경험을 쌓는 방법 ?!",
            "seconds": 128,
            "video": true
          },
          {
            "id": "257897",
            "title": "현업에서 부하 테스트를 왜 할까?",
            "seconds": 228,
            "video": true
          },
          {
            "id": "257898",
            "title": "처리량(Throughput), 지연 시간(Latency)",
            "seconds": 334,
            "video": true
          },
          {
            "id": "257899",
            "title": "부하 테스트 툴 선정 (k6)",
            "seconds": 109,
            "video": true
          },
          {
            "id": "257900",
            "title": "[실습] EC2에 간단한 API 서버 셋팅하기",
            "seconds": 413,
            "video": true
          },
          {
            "id": "257901",
            "title": "[실습] EC2에 부하 테스트 툴 셋팅하기",
            "seconds": 276,
            "video": true
          },
          {
            "id": "257902",
            "title": "[실습] 내가 구성한 백엔드 서버는 1초당 몇 개의 요청을 견뎌낼 수 있을까?",
            "seconds": 876,
            "video": true
          },
          {
            "id": "257903",
            "title": "[실습] 사용하지 않는 EC2 종료하기",
            "seconds": 23,
            "video": true
          },
          {
            "id": "294632",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "257886",
        "title": "부하 테스트를 통해 ‘병목 지점’ 진단하기",
        "units": [
          {
            "id": "257904",
            "title": "병목 지점 (Bottleneck Point)",
            "seconds": 338,
            "video": true
          },
          {
            "id": "257905",
            "title": "부하 테스트의 전체 흐름",
            "seconds": 225,
            "video": true
          },
          {
            "id": "257906",
            "title": "부하 테스트 시 주의점",
            "seconds": 144,
            "video": true
          },
          {
            "id": "257907",
            "title": "[실습] 부하 테스트 할 인프라 구성을 그림으로 파악하기",
            "seconds": 68,
            "video": true
          },
          {
            "id": "257908",
            "title": "[실습] AWS EC2 셋팅하기",
            "seconds": 79,
            "video": true
          },
          {
            "id": "257909",
            "title": "[실습] AWS RDS 셋팅하기",
            "seconds": 317,
            "video": true
          },
          {
            "id": "257910",
            "title": "[실습] AWS ELB 생성하기",
            "seconds": 222,
            "video": true
          },
          {
            "id": "257911",
            "title": "[실습] EC2에 백엔드 서버(Spring Boot) 셋팅하기",
            "seconds": 523,
            "video": true
          },
          {
            "id": "257912",
            "title": "[실습] 내가 구성한 인프라는 1초당 몇 개의 요청을 견뎌낼 수 있을까?",
            "seconds": 762,
            "video": true
          },
          {
            "id": "257913",
            "title": "모니터링(Monitoring), 메트릭(Metric)",
            "seconds": 178,
            "video": true
          },
          {
            "id": "257914",
            "title": "CPU, 메모리(Memory), 디스크(Disk)",
            "seconds": 1138,
            "video": true
          },
          {
            "id": "257915",
            "title": "[실습] EC2 모니터링 셋팅하기",
            "seconds": 580,
            "video": true
          },
          {
            "id": "257916",
            "title": "[실습] RDS 모니터링 셋팅하기",
            "seconds": 168,
            "video": true
          },
          {
            "id": "257917",
            "title": "[보충 강의] ELB의 CPU, 메모리는 왜 측정하지 않나요?",
            "seconds": 136,
            "video": true
          },
          {
            "id": "257918",
            "title": "[실습] 각 서버의 CPU, 메모리를 한 눈에 볼 수 있도록 셋팅하기",
            "seconds": 344,
            "video": true
          },
          {
            "id": "257919",
            "title": "[실습] 부하 테스트를 통해 병목 지점 진단하기",
            "seconds": 299,
            "video": true
          },
          {
            "id": "257920",
            "title": "[보충 강의] 실시간으로 CPU와 메모리를 관측하는 방법",
            "seconds": 426,
            "video": true
          },
          {
            "id": "295015",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "257887",
        "title": "병목 지점을 해결해 성능 개선하기",
        "units": [
          {
            "id": "257921",
            "title": "가용성(Availability), 시스템 이중화",
            "seconds": 277,
            "video": true
          },
          {
            "id": "257922",
            "title": "수평적 확장, 수직적 확장, 캐싱",
            "seconds": 376,
            "video": true
          },
          {
            "id": "257923",
            "title": "트래픽 증가에 따른 시스템 설계 및 확장 방법",
            "seconds": 866,
            "video": true
          },
          {
            "id": "257924",
            "title": "[실습] 병목 지점(DB) 해결하기",
            "seconds": 503,
            "video": true
          },
          {
            "id": "257925",
            "title": "[실습] 병목 지점(웹 애플리케이션 서버) 해결하기",
            "seconds": 916,
            "video": true
          },
          {
            "id": "257926",
            "title": "부하 테스트의 전체 흐름 다시 점검",
            "seconds": 147,
            "video": true
          },
          {
            "id": "257927",
            "title": "[보충 강의] AWS 리소스 종료하기",
            "seconds": 151,
            "video": true
          },
          {
            "id": "294994",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "257888",
        "title": "마무리",
        "units": [
          {
            "id": "257928",
            "title": "이 다음에는 어떤 걸 공부해야 하나요?",
            "seconds": 92,
            "video": true
          },
          {
            "id": "257929",
            "title": "완강을 축하드립니다!! 🎉🎉🎉",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "38": {
    "title": "[기초스피치] 14년차 아나운서에게 배우는 말 잘하는 방법!",
    "url": "https://www.inflearn.com/course/쉽게-배우는-기초스피치",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:42:09",
    "totalSeconds": 47119,
    "totalUnits": 61,
    "sections": [
      {
        "id": "40327",
        "title": "스피치 실력 점검",
        "units": [
          {
            "id": "40326",
            "title": "오리엔테이션",
            "seconds": 184,
            "video": true
          },
          {
            "id": "40328",
            "title": "나의 스피치 상태 진단: 체크리스트",
            "seconds": 958,
            "video": true
          },
          {
            "id": "280628",
            "title": "나의 스피치 상태 진단",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40329",
        "title": "복식호흡과 발성",
        "units": [
          {
            "id": "40330",
            "title": "복식호흡 발성법 : 배우와 아나운서의 발성법",
            "seconds": 530,
            "video": true
          },
          {
            "id": "40331",
            "title": "스타카토 발성법",
            "seconds": 459,
            "video": true
          },
          {
            "id": "280926",
            "title": "복식호읍과 발성 연습하기",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40332",
        "title": "신뢰를 높이는 정확한 발음",
        "units": [
          {
            "id": "40348",
            "title": "21개 모음 발음법",
            "seconds": 725,
            "video": true
          },
          {
            "id": "40349",
            "title": "19개 자음 발음법",
            "seconds": 729,
            "video": true
          },
          {
            "id": "40350",
            "title": "발음 어려운 원고로 훈련 1",
            "seconds": 734,
            "video": true
          },
          {
            "id": "280927",
            "title": "어려운 발음 해보고 그대로 적어보기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40351",
            "title": "발음 어려운 원고로 훈련 2",
            "seconds": 836,
            "video": true
          },
          {
            "id": "40352",
            "title": "발음 어려운 원고로 훈련 3",
            "seconds": 455,
            "video": true
          },
          {
            "id": "40353",
            "title": "발음 어려운 원고로 훈련 4",
            "seconds": 442,
            "video": true
          },
          {
            "id": "295065",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40354",
        "title": "중저음의 목소리로 진중한 말하기",
        "units": [
          {
            "id": "40355",
            "title": "원고 읽는 방법: 아나운서처럼 신뢰를 주는 말투",
            "seconds": 767,
            "video": true
          },
          {
            "id": "280928",
            "title": "아나운서처럼 신뢰를 주는 말투 연습하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40356",
            "title": "단신 뉴스 원고로 신뢰를 주는 말투 습득하기",
            "seconds": 775,
            "video": true
          },
          {
            "id": "40357",
            "title": "단신 뉴스 원고로 톤의 변화를 주는 법",
            "seconds": 623,
            "video": true
          },
          {
            "id": "40359",
            "title": "앵커 원고로 전달력 높이는 말투 훈련",
            "seconds": 1063,
            "video": true
          },
          {
            "id": "40360",
            "title": "앵커 원고로 톤의 변화를 주는 법",
            "seconds": 669,
            "video": true
          },
          {
            "id": "40361",
            "title": "단신 뉴스와 앵커 원고 복습",
            "seconds": 128,
            "video": true
          },
          {
            "id": "294095",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40362",
        "title": "말투만으로 논리정연하게 표현하기",
        "units": [
          {
            "id": "40363",
            "title": "시사 MC 원고로 말투 훈련: 발음과 발성 훈련",
            "seconds": 888,
            "video": true
          },
          {
            "id": "40364",
            "title": "시사 MC 원고로 말투 훈련: 감정을 뺀 채 말하기",
            "seconds": 788,
            "video": true
          },
          {
            "id": "40365",
            "title": "방송 기사 원고 훈련: 목소리만으로 현장감 살리기",
            "seconds": 923,
            "video": true
          },
          {
            "id": "40366",
            "title": "방송 기사 원고 훈련: 접속사를 세련되게 말하는 법",
            "seconds": 522,
            "video": true
          },
          {
            "id": "40367",
            "title": "시사 MC 원고와 방송 기사 원고 복습",
            "seconds": 223,
            "video": true
          },
          {
            "id": "280929",
            "title": "벌써 20강을 마쳤어요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "292708",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40368",
        "title": "부드러운 말하기와 3분 스피치",
        "units": [
          {
            "id": "40369",
            "title": "교양 MC 원고 훈련: 부드러운 대화체 배우기",
            "seconds": 1036,
            "video": true
          },
          {
            "id": "40370",
            "title": "교양 MC 원고 훈련: 발표, 면접, 회의에서 적용하기",
            "seconds": 687,
            "video": true
          },
          {
            "id": "40371",
            "title": "3분 스피치: 결론부터 말하는 내용 구성법",
            "seconds": 894,
            "video": true
          },
          {
            "id": "280930",
            "title": "3분 스피치 원고를 구성해 보아요.",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40372",
            "title": "3분 스피치: 연상기법으로 외우지 않고 말하는 전략",
            "seconds": 652,
            "video": true
          },
          {
            "id": "280931",
            "title": "3분 스피치 스토리 보드 만들기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40373",
            "title": "3분 스피치: 자연스럽게 이야기하는 방법",
            "seconds": 363,
            "video": true
          },
          {
            "id": "292974",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40374",
        "title": "청중을 압도하는 말하기와 3분 스피치",
        "units": [
          {
            "id": "40375",
            "title": "사회자 MC 원고: 핵심 단어를 강조하는 법",
            "seconds": 946,
            "video": true
          },
          {
            "id": "280932",
            "title": "받아적기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40376",
            "title": "사회자 MC 원고: 청중을 휘어잡는 말하기",
            "seconds": 755,
            "video": true
          },
          {
            "id": "40377",
            "title": "3분 스피치: 재미있게 나의 이야기를 하는 법",
            "seconds": 703,
            "video": true
          },
          {
            "id": "40378",
            "title": "3분 스피치: 상대방을 매혹하는 말하기",
            "seconds": 443,
            "video": true
          },
          {
            "id": "40379",
            "title": "교양 MC와 사회자 MC  원고 복습 통해 발성 다지기",
            "seconds": 224,
            "video": true
          },
          {
            "id": "292858",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40380",
        "title": "스피치 전문가로 거듭나는 길",
        "units": [
          {
            "id": "40381",
            "title": "일상 또는 회사에서 나의 말투 점검하기",
            "seconds": 497,
            "video": true
          },
          {
            "id": "40382",
            "title": "스피치 전문가가 되는 길",
            "seconds": 522,
            "video": true
          },
          {
            "id": "280933",
            "title": "나의 말투에서 꼭 고치고 싶은 것",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40383",
        "title": "감정을 표정이 아닌 말투로 우아하게 전하는 법",
        "units": [
          {
            "id": "40384",
            "title": "내레이션 영화 소개: 빠른 속도지만, 정확히 발음하는 법",
            "seconds": 1334,
            "video": true
          },
          {
            "id": "40385",
            "title": "내레이션 영화 소개: 목소리만으로 실감나게 말하기",
            "seconds": 1089,
            "video": true
          },
          {
            "id": "40386",
            "title": "교양 MC 원고로 즐거운 감정 표출하는 법",
            "seconds": 998,
            "video": true
          },
          {
            "id": "40387",
            "title": "교양 MC 원고로 매끄러운 말하기 배우기",
            "seconds": 950,
            "video": true
          },
          {
            "id": "293071",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40388",
        "title": "즉석 스피치",
        "units": [
          {
            "id": "40389",
            "title": "즉석 스피치: 애드립을 높이는 방법",
            "seconds": 586,
            "video": true
          },
          {
            "id": "40390",
            "title": "즉석 스피치: 무조건 결론부터 말하라",
            "seconds": 821,
            "video": true
          }
        ]
      },
      {
        "id": "40391",
        "title": "내레이션 원고로 말투 연습",
        "units": [
          {
            "id": "40392",
            "title": "내레이션 시사 프로그램: 긴장감을 자아내는 목소리",
            "seconds": 956,
            "video": true
          },
          {
            "id": "40393",
            "title": "내레이션 시사 프로그램: 정확한 발음 체득하기",
            "seconds": 953,
            "video": true
          },
          {
            "id": "40394",
            "title": "승무원 기내 방송: 부드럽고 친절한 말하기",
            "seconds": 1001,
            "video": true
          },
          {
            "id": "40395",
            "title": "승무원 기내 방송: 우아하고 도도한 말투 연습",
            "seconds": 1049,
            "video": true
          },
          {
            "id": "40396",
            "title": "헤드라인 뉴스: 풍성한 복식호흡 연마하기",
            "seconds": 1157,
            "video": true
          },
          {
            "id": "40397",
            "title": "헤드라인 뉴스: 발음과 발성 탄탄히 하기",
            "seconds": 839,
            "video": true
          },
          {
            "id": "40398",
            "title": "복습: 내레이션/ 승무원 기내 방송/ 헤드라인 뉴스",
            "seconds": 284,
            "video": true
          },
          {
            "id": "280934",
            "title": "벌써 이만큼이나 왔어요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "292720",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40399",
        "title": "발음 특훈",
        "units": [
          {
            "id": "40400",
            "title": "발음 어려운 원고로 발음 훈련 1",
            "seconds": 880,
            "video": true
          },
          {
            "id": "40401",
            "title": "발음 어려운 원고로 발음 훈련 2",
            "seconds": 866,
            "video": true
          },
          {
            "id": "40402",
            "title": "발음 어려운 원고로 발음 훈련 3",
            "seconds": 1427,
            "video": true
          },
          {
            "id": "40403",
            "title": "발음 어려운 원고로 발음 훈련 4",
            "seconds": 1338,
            "video": true
          },
          {
            "id": "280935",
            "title": "발성연습~! 😉",
            "seconds": 0,
            "video": false
          },
          {
            "id": "292924",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40404",
        "title": "무엇이든 잘 읽는 방법",
        "units": [
          {
            "id": "40405",
            "title": "무엇이든 잘 읽는 비결",
            "seconds": 1430,
            "video": true
          },
          {
            "id": "40406",
            "title": "책 낭독하는 방법: 소설",
            "seconds": 1591,
            "video": true
          },
          {
            "id": "40407",
            "title": "책 낭독하는 방법: 시",
            "seconds": 1104,
            "video": true
          },
          {
            "id": "294228",
            "title": "섹션 13 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40408",
        "title": "1분 자기소개",
        "units": [
          {
            "id": "40409",
            "title": "상황별 1분 자기소개",
            "seconds": 1555,
            "video": true
          },
          {
            "id": "280936",
            "title": "1분 자기소개 작성하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40410",
            "title": "면접별 1분 자기소개",
            "seconds": 1300,
            "video": true
          },
          {
            "id": "280937",
            "title": "1분 자기소개 직접 해보기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "40411",
            "title": "나를 돌아보는 '인생 지도'",
            "seconds": 856,
            "video": true
          },
          {
            "id": "280938",
            "title": "나의 인생지도",
            "seconds": 0,
            "video": false
          },
          {
            "id": "293143",
            "title": "섹션 14 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "40412",
        "title": "최종 복습",
        "units": [
          {
            "id": "40413",
            "title": "뉴스 원고",
            "seconds": 328,
            "video": true
          },
          {
            "id": "40414",
            "title": "MC 원고",
            "seconds": 337,
            "video": true
          },
          {
            "id": "40415",
            "title": "내레이션 원고",
            "seconds": 256,
            "video": true
          },
          {
            "id": "40416",
            "title": "발음 원고",
            "seconds": 464,
            "video": true
          },
          {
            "id": "40417",
            "title": "3분 스피치: 당신에게 스피치란?",
            "seconds": 227,
            "video": true
          },
          {
            "id": "280940",
            "title": "나에게 스피치란?",
            "seconds": 0,
            "video": false
          },
          {
            "id": "293328",
            "title": "섹션 15 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "4": {
    "title": "카프카 완벽 가이드 - 커넥트(Connect) 편",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%ED%94%84%EC%B9%B4-%EC%99%84%EB%B2%BD%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%BB%A4%EB%84%A5%ED%8A%B8",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:43:17",
    "totalSeconds": 88540,
    "totalUnits": 147,
    "sections": [
      {
        "id": "138282",
        "title": "강의 소개와 실습 환경 구축",
        "units": [
          {
            "id": "139427",
            "title": "강의소개",
            "seconds": 431,
            "video": true
          },
          {
            "id": "139976",
            "title": "강의 실습 코드와 교재 소개",
            "seconds": 142,
            "video": true
          },
          {
            "id": "139428",
            "title": "강의 실습 코드와 교재 다운로드 받기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "139869",
            "title": "실습 환경 구축 개요",
            "seconds": 160,
            "video": true
          },
          {
            "id": "138283",
            "title": "오라클 VirtualBox 설치하기",
            "seconds": 343,
            "video": true
          },
          {
            "id": "139272",
            "title": "VirtualBox에서 우분투(Ubuntu) 리눅스 설치 - 01",
            "seconds": 609,
            "video": true
          },
          {
            "id": "139273",
            "title": "VirtualBox에서 우분투(Ubuntu) 리눅스 설치 - 02",
            "seconds": 391,
            "video": true
          },
          {
            "id": "139274",
            "title": "우분투(Ubuntu)에 추가 SW 설치",
            "seconds": 239,
            "video": true
          },
          {
            "id": "139275",
            "title": "우분투(Ubuntu)에 고정 IP 할당하기",
            "seconds": 642,
            "video": true
          },
          {
            "id": "139276",
            "title": "우분투(Ubuntu)에 SSH를 위한 Client 환경 구성",
            "seconds": 418,
            "video": true
          },
          {
            "id": "139277",
            "title": "카프카(Kafka) 설치",
            "seconds": 503,
            "video": true
          },
          {
            "id": "139278",
            "title": "카프카 기동하기",
            "seconds": 670,
            "video": true
          },
          {
            "id": "139279",
            "title": "카프카 서버 환경 설정",
            "seconds": 755,
            "video": true
          },
          {
            "id": "139862",
            "title": "<중요-스킵하지 마세요> VM 종료 시 유의사항",
            "seconds": 143,
            "video": true
          },
          {
            "id": "294213",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139280",
        "title": "카프카 커넥트(Kafka Connect) 개요",
        "units": [
          {
            "id": "139281",
            "title": "카프카 커넥트(Kafka Connect) 소개",
            "seconds": 777,
            "video": true
          },
          {
            "id": "139282",
            "title": "커넥트 주요 구성 요소 - Connector, SMT, Converter 개요",
            "seconds": 536,
            "video": true
          },
          {
            "id": "139283",
            "title": "커넥트 아키텍처와 Connect Cluster, Worker, Task 개념",
            "seconds": 377,
            "video": true
          },
          {
            "id": "139284",
            "title": "커넥트 기동하기",
            "seconds": 824,
            "video": true
          },
          {
            "id": "139285",
            "title": "Connector 유형 및 Confluent Connect Hub 소개",
            "seconds": 563,
            "video": true
          },
          {
            "id": "294026",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139286",
        "title": "카프카 커넥트(Connect) 주요 구성요소 알아보기  - Spooldir Source Connector 구성 실습",
        "units": [
          {
            "id": "139287",
            "title": "Spooldir Source Connector 개요",
            "seconds": 352,
            "video": true
          },
          {
            "id": "139288",
            "title": "Spooldir Source Connector Plugin 설치",
            "seconds": 575,
            "video": true
          },
          {
            "id": "139289",
            "title": "Spooldir Source Connector 생성 하기 - 01",
            "seconds": 654,
            "video": true
          },
          {
            "id": "139290",
            "title": "Spooldir Source Connector 생성 하기 - 02",
            "seconds": 1078,
            "video": true
          },
          {
            "id": "139291",
            "title": "<중요-스킵하지 마세요>실습 후 VM 종료시 유의 사항",
            "seconds": 116,
            "video": true
          },
          {
            "id": "139292",
            "title": "Connector 생성 시 커넥트(Connect)의 내부 프로세스 수행 이해",
            "seconds": 518,
            "video": true
          },
          {
            "id": "139293",
            "title": "Spooldir Source Connector의 주요 환경 파라미터 이해",
            "seconds": 615,
            "video": true
          },
          {
            "id": "139294",
            "title": "Connector Class 살짝 뜯어보기",
            "seconds": 412,
            "video": true
          },
          {
            "id": "139295",
            "title": "스키마(Schema) 메시지의 이해와 필요성",
            "seconds": 611,
            "video": true
          },
          {
            "id": "139296",
            "title": "Converter의 이해",
            "seconds": 512,
            "video": true
          },
          {
            "id": "139297",
            "title": "커넥트 내부 토픽 이해 - connect-offsets, connect-status, connect-configs",
            "seconds": 676,
            "video": true
          },
          {
            "id": "139298",
            "title": "connect-offsets 내부 토픽을 이용한 Source Connector의 offset 관리 메커니즘 이해",
            "seconds": 1063,
            "video": true
          },
          {
            "id": "139299",
            "title": "curl 대신 httpie를 이용하여 REST API 호출하기",
            "seconds": 644,
            "video": true
          },
          {
            "id": "139300",
            "title": "커넥트 관리를 위한 다양한 REST API 실습",
            "seconds": 948,
            "video": true
          },
          {
            "id": "139301",
            "title": "SMT(Single Message Transform) 이해",
            "seconds": 670,
            "video": true
          },
          {
            "id": "139774",
            "title": "kafkacat 소개",
            "seconds": 214,
            "video": true
          },
          {
            "id": "139775",
            "title": "kafkacat 사용법 실습",
            "seconds": 1186,
            "video": true
          },
          {
            "id": "139776",
            "title": "kafkacat을 이용하여 개별 Source Connector의 offset을 리셋하기",
            "seconds": 806,
            "video": true
          },
          {
            "id": "294550",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139302",
        "title": "JDBC Source Connector의 이해",
        "units": [
          {
            "id": "139303",
            "title": "JDBC Source Connector 소개",
            "seconds": 768,
            "video": true
          },
          {
            "id": "139304",
            "title": "실습 수행을 위한 MySQL 설치하기",
            "seconds": 871,
            "video": true
          },
          {
            "id": "139305",
            "title": "JDBC Source Connector Plugin 설치하기",
            "seconds": 650,
            "video": true
          },
          {
            "id": "139306",
            "title": "JDBC Source Connector의 환경 설정 파라미터 이해",
            "seconds": 674,
            "video": true
          },
          {
            "id": "139802",
            "title": "Incrementing 모드로 JDBC Source Connector 생성하기",
            "seconds": 830,
            "video": true
          },
          {
            "id": "139803",
            "title": "JDBC Source Connector가 만드는 메시지 이해 및 스키마(Schema) 필요성",
            "seconds": 688,
            "video": true
          },
          {
            "id": "139309",
            "title": "Timestamp 모드로 JDBC Source Connector 생성하기",
            "seconds": 855,
            "video": true
          },
          {
            "id": "139310",
            "title": "테이블의 컬럼 타입에 따른 메시지의 변환 이해",
            "seconds": 589,
            "video": true
          },
          {
            "id": "139311",
            "title": "JDBC Source Connector의 Offset 관리 메커니즘 이해 - 01",
            "seconds": 491,
            "video": true
          },
          {
            "id": "139312",
            "title": "JDBC Source Connector의 Offset 관리 메커니즘 이해 - 02",
            "seconds": 767,
            "video": true
          },
          {
            "id": "139313",
            "title": "<중요-스킵하지 마세요>connect-offsets 토픽 삭제를 통한 커넥트 환경 초기화 하기",
            "seconds": 830,
            "video": true
          },
          {
            "id": "139777",
            "title": "<중요 - 스킵하지 마세요> Kafka 실습 환경 전체 초기화 하기",
            "seconds": 486,
            "video": true
          },
          {
            "id": "139314",
            "title": "SMT를 이용하여 테이블의 PK를 메시지의 Key로 변환하기 개요",
            "seconds": 608,
            "video": true
          },
          {
            "id": "139315",
            "title": "SMT를 이용하여 테이블의 PK를 메시지의 Key로 변환하기 실습 - 01",
            "seconds": 793,
            "video": true
          },
          {
            "id": "139316",
            "title": "SMT를 이용하여 테이블의 PK를 메시지의 Key로 변환하기 실습 - 02",
            "seconds": 248,
            "video": true
          },
          {
            "id": "139317",
            "title": "여러 개의 컬럼으로 구성된 테이블의 PK를 메시지의 Key값으로 설정하기",
            "seconds": 646,
            "video": true
          },
          {
            "id": "139318",
            "title": "SMT를 이용하여 토픽명 변경하기 - 01",
            "seconds": 516,
            "video": true
          },
          {
            "id": "139319",
            "title": "SMT를 이용하여 토픽명 변경하기 - 02",
            "seconds": 397,
            "video": true
          },
          {
            "id": "139320",
            "title": "<중요-스킵하지 마세요> 다음 강의인 JDBC Sinc Connector 연동을 위한  JDBC Source Connector 재 생성하기",
            "seconds": 813,
            "video": true
          },
          {
            "id": "294859",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139321",
        "title": "JDBC Sink Connector의 이해",
        "units": [
          {
            "id": "139322",
            "title": "JDBC Sink Connector 소개",
            "seconds": 545,
            "video": true
          },
          {
            "id": "139323",
            "title": "JDBC Sink Connector의 환경 설정 파라미터 이해",
            "seconds": 800,
            "video": true
          },
          {
            "id": "139324",
            "title": "Sink Connector 실습을 위한 MySQL 구성",
            "seconds": 350,
            "video": true
          },
          {
            "id": "139325",
            "title": "REST API 간소화를 위한 유틸리티 쉘 생성하기",
            "seconds": 491,
            "video": true
          },
          {
            "id": "139326",
            "title": "JDBC Sink Connector 생성 실습 - 01",
            "seconds": 746,
            "video": true
          },
          {
            "id": "139327",
            "title": "JDBC Sink Connector 생성 실습 - 02",
            "seconds": 752,
            "video": true
          },
          {
            "id": "139328",
            "title": "JDBC Source와 Sink Connector 연동 실습  - Insert DML 처리",
            "seconds": 512,
            "video": true
          },
          {
            "id": "139329",
            "title": "JDBC Sink Connector의 Update DML 처리 로직 이해",
            "seconds": 311,
            "video": true
          },
          {
            "id": "139330",
            "title": "JDBC Source와 Sink Connector 연동 실습 - Update DML 처리",
            "seconds": 590,
            "video": true
          },
          {
            "id": "139331",
            "title": "JDBC Sink Connector의 Delete DML 처리 실습",
            "seconds": 900,
            "video": true
          },
          {
            "id": "139332",
            "title": "JDBC Source Connector에서 날짜와 시간관련 데이터 변환의 이해",
            "seconds": 309,
            "video": true
          },
          {
            "id": "139333",
            "title": "JDBC Source와 Sink Connector에서 MySQL date, datetime, timestamp 타입 컬럼 연동 실습",
            "seconds": 687,
            "video": true
          },
          {
            "id": "294308",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139336",
        "title": "Debezium MySQL CDC Source Connector의 이해 - 01",
        "units": [
          {
            "id": "139337",
            "title": "CDC(Change Data Capture)의 이해",
            "seconds": 596,
            "video": true
          },
          {
            "id": "139938",
            "title": "MySQL 복제(Replication) 개요",
            "seconds": 658,
            "video": true
          },
          {
            "id": "139338",
            "title": "Debezium CDC Source Connector 소개",
            "seconds": 850,
            "video": true
          },
          {
            "id": "139339",
            "title": "Debezium CDC MySQL용 Source Connector 설치하기",
            "seconds": 592,
            "video": true
          },
          {
            "id": "139340",
            "title": "CDC 실습을 위한 MySQL 환경 설정",
            "seconds": 826,
            "video": true
          },
          {
            "id": "139341",
            "title": "Debezium MySQL Connector의 주요 환경 파라미터 이해 - 01",
            "seconds": 525,
            "video": true
          },
          {
            "id": "139342",
            "title": "Debezium MySQL Connector의 주요 환경 파라미터 이해 - 02",
            "seconds": 659,
            "video": true
          },
          {
            "id": "139343",
            "title": "Debezium Source Connector 생성하기",
            "seconds": 832,
            "video": true
          },
          {
            "id": "139344",
            "title": "Debezium Source Connector에서 생성한 메시지를 JDBC Sink Connector로 DB 입력 테스트",
            "seconds": 549,
            "video": true
          },
          {
            "id": "139345",
            "title": "Debezium에서 생성한 메시지를 SMT를 이용하여 After 메시지만 추출하기",
            "seconds": 738,
            "video": true
          },
          {
            "id": "139346",
            "title": "After 메시지를 JDBC Sink Connector로 DB 입력하기",
            "seconds": 475,
            "video": true
          },
          {
            "id": "139347",
            "title": "JDBC Sink Connector에서 SMT를 이용하여 After 메시지로 변환 후 DB 입력하기",
            "seconds": 630,
            "video": true
          },
          {
            "id": "294641",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139349",
        "title": "Debezium MySQL CDC Source Connector의 이해 - 02",
        "units": [
          {
            "id": "139350",
            "title": "Debezium 스냅샷(Snapshot) 이해",
            "seconds": 613,
            "video": true
          },
          {
            "id": "139351",
            "title": "Debezium Source Connector의 Offset 관리 메커니즘 이해",
            "seconds": 522,
            "video": true
          },
          {
            "id": "139352",
            "title": "오래된 binlog를 삭제할 시 Debezium Source Connector 기동 오류 이해",
            "seconds": 311,
            "video": true
          },
          {
            "id": "139353",
            "title": "DBMS 컬럼 타입에 따른 Debezium 메시지 변환 이해 - Numeric과 Decimal 타입",
            "seconds": 376,
            "video": true
          },
          {
            "id": "139354",
            "title": "Numeric과 Decimal 컬럼 타입 데이터를 Debezium Source와 JDBC Sink로 연동 실습",
            "seconds": 665,
            "video": true
          },
          {
            "id": "139355",
            "title": "DBMS 컬럼 타입에 따른 Debezium 메시지 변환 이해 - Date와 Datetime 타입",
            "seconds": 710,
            "video": true
          },
          {
            "id": "139356",
            "title": "Date와 Datetime 컬럼 타입 데이터를 Debezium Source와 JDBC Sink로 연동 실습",
            "seconds": 944,
            "video": true
          },
          {
            "id": "139357",
            "title": "DBMS 컬럼 타입에 따른 Debezium 메시지 변환 이해 - Timestamp 타입(timezone 포함)",
            "seconds": 681,
            "video": true
          },
          {
            "id": "139358",
            "title": "Timestamp 컬럼 타입 데이터를 Debezium Source와 JDBC Sink로 연동 실습 - 01",
            "seconds": 623,
            "video": true
          },
          {
            "id": "139359",
            "title": "Timestamp 컬럼 타입 데이터를 Debezium Source와 JDBC Sink로 연동 실습 - 02",
            "seconds": 945,
            "video": true
          },
          {
            "id": "139360",
            "title": "대량 데이터로 Debezium Source와 JDBC Sink Connector 연동 실습 - 01",
            "seconds": 591,
            "video": true
          },
          {
            "id": "139361",
            "title": "대량 데이터로 Debezium Source와 JDBC Sink Connector 연동 실습 - 02",
            "seconds": 751,
            "video": true
          },
          {
            "id": "139362",
            "title": "대량 데이터로 Debezium Source와 JDBC Sink Connector 연동 실습 - 03",
            "seconds": 505,
            "video": true
          },
          {
            "id": "139363",
            "title": "Debezium Source Connector의 메시지 배치(Batch) 처리 이해",
            "seconds": 749,
            "video": true
          },
          {
            "id": "139364",
            "title": "JDBC Sink Connector의 메시지 배치(Batch) 처리 이해",
            "seconds": 776,
            "video": true
          },
          {
            "id": "139365",
            "title": "Upsert DML기반의 JDBC 배치(Batch) 처리 이해 및 JDBC Sink Connector 성능 향상 방법",
            "seconds": 893,
            "video": true
          },
          {
            "id": "295085",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139366",
        "title": "Debezium MySQL CDC Source Connector의 이해 - 03",
        "units": [
          {
            "id": "139367",
            "title": "SMT를 이용하여 Debezium Source Connector의 토픽명 변경",
            "seconds": 955,
            "video": true
          },
          {
            "id": "139368",
            "title": "Source 테이블의 스키마 변경 시 Sink 테이블의 자동 스키마 반영 이해",
            "seconds": 446,
            "video": true
          },
          {
            "id": "139369",
            "title": "Source 테이블의 컬럼 추가시 Sink 테이블의 스키마 반영 실습",
            "seconds": 1022,
            "video": true
          },
          {
            "id": "139370",
            "title": "Source 테이블의 Not Null 컬럼 추가시 Sink 테이블의 스키마 반영 실습",
            "seconds": 660,
            "video": true
          },
          {
            "id": "139371",
            "title": "Source 테이블의 Datetime 컬럼의 Default 값 설정 시 유의 사항",
            "seconds": 100,
            "video": true
          },
          {
            "id": "139372",
            "title": "Source 테이블의 Varchar 컬럼 추가시 Sink 테이블의 스키마 반영 실습",
            "seconds": 1003,
            "video": true
          },
          {
            "id": "139373",
            "title": "Source 테이블의 컬럼 타입 변경시 Sink 테이블의 스키마 반영 실습",
            "seconds": 575,
            "video": true
          },
          {
            "id": "139374",
            "title": "Source 테이블의 컬럼 삭제시 Sink 테이블의 스키마 반영 실습",
            "seconds": 295,
            "video": true
          },
          {
            "id": "139375",
            "title": "Source 테이블의 컬럼명 변경시 Sink 테이블의 스키마 반영 실습",
            "seconds": 688,
            "video": true
          },
          {
            "id": "139376",
            "title": "<중요-스킵하지 마세요>Source 테이블의 스키마 변경 실습을 재 수행 시 유의 사항 및 환경 재 구성 방안",
            "seconds": 279,
            "video": true
          },
          {
            "id": "139377",
            "title": "Debezium Snapshot 모드 - schema_only 모드 이해",
            "seconds": 492,
            "video": true
          },
          {
            "id": "139378",
            "title": "schema_only Snapshot 모드 설정 및 연동 실습",
            "seconds": 643,
            "video": true
          },
          {
            "id": "295409",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139379",
        "title": "스키마 레지스트리(Schema Registry)의 이해",
        "units": [
          {
            "id": "139380",
            "title": "스키마 레지스트리(Schema Registry) 개요",
            "seconds": 460,
            "video": true
          },
          {
            "id": "139381",
            "title": "스키마 레지스트리 기동하기",
            "seconds": 264,
            "video": true
          },
          {
            "id": "139382",
            "title": "Avro 소개",
            "seconds": 461,
            "video": true
          },
          {
            "id": "139383",
            "title": "kafka-avro-console-producer/consumer를 이용하여 Avro 메시지 보내고 읽기",
            "seconds": 464,
            "video": true
          },
          {
            "id": "139384",
            "title": "스키마 레지스트리 기반의 Debezium Source Connector 설정 및 생성 하기",
            "seconds": 754,
            "video": true
          },
          {
            "id": "139385",
            "title": "스키마 레지스트리 주요 구성 요소 및 스키마(Schema) 정보 확인 하기",
            "seconds": 789,
            "video": true
          },
          {
            "id": "139386",
            "title": "스키마 레지스트리 기반의 JDBC Sink Connector 설정 및 생성 하기",
            "seconds": 504,
            "video": true
          },
          {
            "id": "139387",
            "title": "Schema와 Schemaless의 이해",
            "seconds": 760,
            "video": true
          },
          {
            "id": "139388",
            "title": "Avro 메시지의 스키마 이해",
            "seconds": 612,
            "video": true
          },
          {
            "id": "139389",
            "title": "Avro 메시지의 스키마 호환성(Schema Compatibility) 이해",
            "seconds": 789,
            "video": true
          },
          {
            "id": "139390",
            "title": "스키마 레지스트리의 Subject 이해",
            "seconds": 689,
            "video": true
          },
          {
            "id": "139391",
            "title": "스키마 레지스트리에서 스키마 호환성 이해 - 01",
            "seconds": 541,
            "video": true
          },
          {
            "id": "139392",
            "title": "스키마 레지스트리에서 스키마 호환성 이해 - 02",
            "seconds": 1020,
            "video": true
          },
          {
            "id": "139393",
            "title": "Debezium Source와 JDBC Sink Connector를 이용하여 스키마 레지스트리의 스키마 호환성 실습 - 01",
            "seconds": 607,
            "video": true
          },
          {
            "id": "139394",
            "title": "Debezium Source와 JDBC Sink Connector를 이용하여 스키마 레지스트리의 스키마 호환성 실습 - 02",
            "seconds": 860,
            "video": true
          },
          {
            "id": "139395",
            "title": "Debezium Source와 JDBC Sink Connector를 이용하여 스키마 레지스트리의 스키마 호환성 실습 - 03",
            "seconds": 703,
            "video": true
          },
          {
            "id": "139396",
            "title": "Debezium Source와 JDBC Sink Connector를 이용하여 스키마 레지스트리의 스키마 호환성 실습 - 04",
            "seconds": 757,
            "video": true
          },
          {
            "id": "139397",
            "title": "<중요-스킵하지 마세요>스키마 레지스트리의 스키마 호환성 실습 정리 및 실습 재 수행 시 유의 사항",
            "seconds": 599,
            "video": true
          },
          {
            "id": "293346",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139863",
        "title": "Debezium Source MySQL에서 JDBC Sink PostgreSQL 연동",
        "units": [
          {
            "id": "139864",
            "title": "MySQL 연동 실습 환경 구축 및 PostgreSQL 설치",
            "seconds": 492,
            "video": true
          },
          {
            "id": "139865",
            "title": "PostgreSQL 실습 환경 구축",
            "seconds": 929,
            "video": true
          },
          {
            "id": "139866",
            "title": "MySQL과 PostgreSQL 연동 시 데이터 타입 변환 이해",
            "seconds": 447,
            "video": true
          },
          {
            "id": "139867",
            "title": "MySQL과 PostgreSQL 연동 실습 - 01",
            "seconds": 803,
            "video": true
          },
          {
            "id": "139868",
            "title": "MySQL과 PostgreSQL 연동 실습 - 02",
            "seconds": 844,
            "video": true
          },
          {
            "id": "139995",
            "title": "MySQL Source 테이블 스키마 변경 유형에 따른 PostgreSQL Sink 테이블 자동 스키마 반영",
            "seconds": 292,
            "video": true
          },
          {
            "id": "293493",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "159797",
        "title": "<부록> Debezium PostgreSQL CDC Source Connector의 이해",
        "units": [
          {
            "id": "159800",
            "title": "PostgreSQL 복제(Replication) 메커니즘 소개",
            "seconds": 551,
            "video": true
          },
          {
            "id": "159801",
            "title": "CDC 복제를 위한 PostgreSQL 환경 설정",
            "seconds": 748,
            "video": true
          },
          {
            "id": "159803",
            "title": "Debezium PostgreSQL Source Connector 이해",
            "seconds": 558,
            "video": true
          },
          {
            "id": "159806",
            "title": "Debezium PostgreSQL Source Connector Config 파라미터 이해",
            "seconds": 454,
            "video": true
          },
          {
            "id": "159808",
            "title": "Debezium PostgreSQL Source Connector Plugin 설치하기",
            "seconds": 353,
            "video": true
          },
          {
            "id": "159809",
            "title": "Debezium PostgreSQL Source Connector 생성하기",
            "seconds": 609,
            "video": true
          },
          {
            "id": "159810",
            "title": "JDBC Sink Connector 연동",
            "seconds": 258,
            "video": true
          },
          {
            "id": "159811",
            "title": "Source Connector에서 PostgreSQL Publication 생성 및 적용 - 01",
            "seconds": 817,
            "video": true
          },
          {
            "id": "159812",
            "title": "Source Connector에서 PostgreSQL Publication 생성 및 적용 - 02",
            "seconds": 837,
            "video": true
          },
          {
            "id": "159814",
            "title": "Source 테이블에서 Number 컬럼 추가 시 Sink 테이블 자동 반영",
            "seconds": 819,
            "video": true
          },
          {
            "id": "159815",
            "title": "Source 테이블에서 Varchar 컬럼 추가 시 Sink 테이블 자동 반영",
            "seconds": 302,
            "video": true
          },
          {
            "id": "159816",
            "title": "PostgreSQL Temporal 타입 이해",
            "seconds": 375,
            "video": true
          },
          {
            "id": "159817",
            "title": "Source 테이블의 date, timestamp, timestamptz 타입 컬럼 처리",
            "seconds": 741,
            "video": true
          },
          {
            "id": "159818",
            "title": "정리하며",
            "seconds": 108,
            "video": true
          },
          {
            "id": "293731",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "139939",
        "title": "맺으며",
        "units": [
          {
            "id": "139940",
            "title": "맺으며, 그리고",
            "seconds": 141,
            "video": true
          }
        ]
      }
    ]
  },
  "extra-system-design": {
    "title": "시스템 디자인 첫걸음: 면접에서 돋보이는 백엔드 아키텍처 설계하기",
    "url": "https://www.inflearn.com/course/%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%B2%AB%EA%B1%B8%EC%9D%8C",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-08-01 09:00:00",
    "totalSeconds": 17941,
    "totalUnits": 20,
    "sections": [
      {
        "id": "247675",
        "title": "왜 시스템 디자인을 배워야하는가?",
        "units": [
          {
            "id": "306283",
            "title": "수업 자료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "247676",
            "title": "왜 내 프로젝트는 면접에서 통하지 않았을까?",
            "seconds": 445,
            "video": true
          },
          {
            "id": "277931",
            "title": "강의 소개",
            "seconds": 416,
            "video": true
          },
          {
            "id": "280174",
            "title": "Mission 1. 지금까지 해본 프로젝트를 적어봅시다",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "277928",
        "title": "시스템 디자인의 핵심 목표 4가지",
        "units": [
          {
            "id": "277932",
            "title": "'잘' 만든 대규모 시스템이란",
            "seconds": 311,
            "video": true
          },
          {
            "id": "277933",
            "title": "신뢰성",
            "seconds": 802,
            "video": true
          },
          {
            "id": "277934",
            "title": "성능",
            "seconds": 769,
            "video": true
          },
          {
            "id": "277935",
            "title": "가용성",
            "seconds": 625,
            "video": true
          },
          {
            "id": "277936",
            "title": "확장성",
            "seconds": 586,
            "video": true
          },
          {
            "id": "280187",
            "title": "Mission 2. 내가 하고 싶은 프로젝트와 목표를 정해봅시다",
            "seconds": 0,
            "video": false
          },
          {
            "id": "312326",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "277929",
        "title": "주요 시스템 컴포넌트와 트레이드오프",
        "units": [
          {
            "id": "284143",
            "title": "대규모 시스템은 어떤 컴포넌트로 구성될까?",
            "seconds": 213,
            "video": true
          },
          {
            "id": "278147",
            "title": "서버와 서버 간 통신",
            "seconds": 1157,
            "video": true
          },
          {
            "id": "278148",
            "title": "API 게이트웨이 & 로드밸런서 & 서비스 디스커버리",
            "seconds": 961,
            "video": true
          },
          {
            "id": "278149",
            "title": "DB 핵심 개념 (확장성/일관성/가용성)",
            "seconds": 1428,
            "video": true
          },
          {
            "id": "278150",
            "title": "DB 종류와 선택 전략",
            "seconds": 1493,
            "video": true
          },
          {
            "id": "278151",
            "title": "캐시 & CDN",
            "seconds": 1229,
            "video": true
          },
          {
            "id": "278152",
            "title": "메세지 큐 & 이벤트 브로커",
            "seconds": 1932,
            "video": true
          },
          {
            "id": "278153",
            "title": "배치 처리 & 스트리밍 처리",
            "seconds": 1670,
            "video": true
          },
          {
            "id": "280201",
            "title": "Mission 3. 내 프로젝트에서 다루고 싶은 문제를 설정해봅시다",
            "seconds": 0,
            "video": false
          },
          {
            "id": "312325",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "277930",
        "title": "나만의 아키텍처 설계하고 설명하기",
        "units": [
          {
            "id": "321520",
            "title": "면접에서 돋보이는 프로젝트를 하는 방법",
            "seconds": 1213,
            "video": true
          },
          {
            "id": "285782",
            "title": "자주 사용되는 소프트웨어 아키텍처",
            "seconds": 1318,
            "video": true
          },
          {
            "id": "278155",
            "title": "예시 프로젝트를 통해 아키텍처 설계하기",
            "seconds": 996,
            "video": true
          },
          {
            "id": "278157",
            "title": "시스템 디자인을 더 공부하고 싶다면",
            "seconds": 377,
            "video": true
          },
          {
            "id": "280204",
            "title": "Mission4. 내 프로젝트 아키텍처를 그려봅시다",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "14": {
    "title": "카카오, 토스 개발자가 알려주는 수백개의 MSA 환경에서의 성능 보장을 위한 RPC 처리 기법",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%86%A0%EC%8A%A4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%95%8C%EB%A0%A4%EC%A3%BC%EB%8A%94-%EC%88%98%EB%B0%B1%EA%B0%9C",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-10-15 21:39:49",
    "totalSeconds": 16042,
    "totalUnits": 24,
    "sections": [
      {
        "id": "355952",
        "title": "강의 소개",
        "units": [
          {
            "id": "355953",
            "title": "강의 소개",
            "seconds": 726,
            "video": true
          },
          {
            "id": "357443",
            "title": "Source Code",
            "seconds": 0,
            "video": false
          },
          {
            "id": "357444",
            "title": "gRPC 강의 요약 파일",
            "seconds": 0,
            "video": false
          },
          {
            "id": "358272",
            "title": "공식 gRPC 홈페이지",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "357445",
        "title": "개발 환경별 언어의 차이",
        "units": [
          {
            "id": "357446",
            "title": "개발 환경에 대한 Java vs Go의 차이 알아보기",
            "seconds": 425,
            "video": true
          }
        ]
      },
      {
        "id": "357447",
        "title": "분산 시스템의 발전과 그에따른 단점들",
        "units": [
          {
            "id": "357449",
            "title": "왜 다양한 프로토콜이 존재하고 발전될까",
            "seconds": 1067,
            "video": true
          },
          {
            "id": "357452",
            "title": "분산 시스템에서의 대표적인 문제와 RPC 패러다임",
            "seconds": 805,
            "video": true
          },
          {
            "id": "357454",
            "title": "Google은 왜 gRPC를 사용하고 도입했을까",
            "seconds": 1269,
            "video": true
          },
          {
            "id": "358284",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "357456",
        "title": "Protocol Buffers와 .protoc 작성법",
        "units": [
          {
            "id": "357459",
            "title": "Protocol Buffers와 그에따른 설계 철학",
            "seconds": 673,
            "video": true
          },
          {
            "id": "357460",
            "title": "기본 .proto 문법 작성과 메시지간에 연관 관계 맺기",
            "seconds": 1111,
            "video": true
          },
          {
            "id": "357461",
            "title": "고급 .proto 패턴과 실무적인 메시지 모델링 하기",
            "seconds": 919,
            "video": true
          },
          {
            "id": "358285",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "357462",
        "title": "gRPC에서의 다양한 통신 기법",
        "units": [
          {
            "id": "357463",
            "title": "가장 많이 사용되고 반드시 알아야 하는 Unary RPC 통신 및 최적화",
            "seconds": 1282,
            "video": true
          },
          {
            "id": "357464",
            "title": "실시간 통신에 필수로 사용이되는 Streaming RPC 통신",
            "seconds": 679,
            "video": true
          },
          {
            "id": "357465",
            "title": "Bidirectional Streaming RPC 주의 사항 및 동시성",
            "seconds": 676,
            "video": true
          },
          {
            "id": "358287",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "357466",
        "title": "gRPC에서의 최적화 기법과 구현 기능",
        "units": [
          {
            "id": "357467",
            "title": "gRPC Performance Best Practice",
            "seconds": 838,
            "video": true
          },
          {
            "id": "357468",
            "title": "통신 안정화를 위한 Flow Control & 코드 재사용을 위한Interceptors",
            "seconds": 788,
            "video": true
          },
          {
            "id": "357469",
            "title": "gRPC Load Balancing & Reflection의 유용함",
            "seconds": 430,
            "video": true
          },
          {
            "id": "357470",
            "title": "Graceful Shutdown을 통한 리소스 정리 & Request Hedging을 통한 최적화",
            "seconds": 635,
            "video": true
          },
          {
            "id": "358286",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "358265",
        "title": "gRPC 전체 실습",
        "units": [
          {
            "id": "358266",
            "title": "카카오 쇼핑하기와 같은 이커머스 플랫폼 proto 설계하기",
            "seconds": 643,
            "video": true
          },
          {
            "id": "358267",
            "title": "자동 코드 생성 기능을 통해 생성된 pb 파일 분석",
            "seconds": 544,
            "video": true
          },
          {
            "id": "358268",
            "title": "eCommerce Business Logic 분석하며 배우는 gRPC 구현",
            "seconds": 544,
            "video": true
          },
          {
            "id": "358269",
            "title": "eCommerce gRPC Server와 Client 구성에 따른 코드 분석 및 학습하기 이후의 테스트",
            "seconds": 717,
            "video": true
          },
          {
            "id": "358270",
            "title": "KakaoTalk과 같은 양방향 통신 메시지 플랫폼 proto 설계하기",
            "seconds": 356,
            "video": true
          },
          {
            "id": "358271",
            "title": "Stream 통신을 위한 Clinet, Server gRPC 코드 분석하기",
            "seconds": 915,
            "video": true
          },
          {
            "id": "358288",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "43": {
    "title": "블록체인 채굴 모듈 만들어보기",
    "url": "https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B4%EC%84%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%BD%94%EC%96%B4-golang",
    "checkedOn": "2026-09-06",
    "updatedAt": "2024-05-01 10:38:59",
    "totalSeconds": 17047,
    "totalUnits": 33,
    "sections": [
      {
        "id": "192663",
        "title": "강의 소개 및 기본",
        "units": [
          {
            "id": "192664",
            "title": "강의 소개",
            "seconds": 252,
            "video": true
          },
          {
            "id": "192799",
            "title": "블록체인 기본 [1]",
            "seconds": 190,
            "video": true
          },
          {
            "id": "192800",
            "title": "블록체인 기본 [2]",
            "seconds": 501,
            "video": true
          },
          {
            "id": "309926",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "192801",
        "title": "모듈 기본 구조 및 환경설정",
        "units": [
          {
            "id": "192806",
            "title": "수업에서 총 사용하는 라이브러리",
            "seconds": 0,
            "video": false
          },
          {
            "id": "192802",
            "title": "flag 사용하기",
            "seconds": 398,
            "video": true
          },
          {
            "id": "192803",
            "title": "환경 파일 구축 및 호출하기",
            "seconds": 463,
            "video": true
          },
          {
            "id": "192804",
            "title": "모듈 구조 잡기",
            "seconds": 404,
            "video": true
          },
          {
            "id": "192805",
            "title": "Mongo 연결 및 로깅 설정하기",
            "seconds": 530,
            "video": true
          },
          {
            "id": "310344",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "193380",
        "title": "CLI를 위한 Scan 코드 작성하기",
        "units": [
          {
            "id": "193381",
            "title": "osStdin을 통한 값 파싱하기",
            "seconds": 242,
            "video": true
          },
          {
            "id": "193382",
            "title": "요청 값 분기처리하기",
            "seconds": 383,
            "video": true
          },
          {
            "id": "193383",
            "title": "순환 참조 방지를 위한 service 연결하기",
            "seconds": 346,
            "video": true
          },
          {
            "id": "310066",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "193384",
        "title": "지갑 생성하기",
        "units": [
          {
            "id": "193385",
            "title": "privateKey 생성하기",
            "seconds": 687,
            "video": true
          },
          {
            "id": "193386",
            "title": "PublicKey가져오기",
            "seconds": 682,
            "video": true
          },
          {
            "id": "221009",
            "title": "다음 챕터에서 발생하는 코드 변경사항 입니다.",
            "seconds": 412,
            "video": true
          },
          {
            "id": "193387",
            "title": "생성된 지갑을 DB에 추가하기",
            "seconds": 924,
            "video": true
          },
          {
            "id": "309950",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "193390",
        "title": "module에서 사용가능한 지갑 설정하기",
        "units": [
          {
            "id": "193393",
            "title": "CLI 항목 추가 및 Repository 구성하기",
            "seconds": 547,
            "video": true
          },
          {
            "id": "193394",
            "title": "로직 추가 및 분기 처리하기",
            "seconds": 362,
            "video": true
          },
          {
            "id": "193395",
            "title": "테스트 및 디버깅",
            "seconds": 178,
            "video": true
          },
          {
            "id": "309952",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "193396",
        "title": "체인 구성하기",
        "units": [
          {
            "id": "194392",
            "title": "블록체인의 블록 구조 잡기",
            "seconds": 577,
            "video": true
          },
          {
            "id": "194393",
            "title": "비트마스킹을 통한 해시값 생성하기",
            "seconds": 625,
            "video": true
          },
          {
            "id": "194394",
            "title": "블록에 대한 채굴 코드 작성하기",
            "seconds": 596,
            "video": true
          },
          {
            "id": "194395",
            "title": "채굴 코드 연동하기",
            "seconds": 482,
            "video": true
          },
          {
            "id": "194396",
            "title": "트랜잭션 생성하기",
            "seconds": 696,
            "video": true
          },
          {
            "id": "194397",
            "title": "트랜잭션 해시 함수 작성하기",
            "seconds": 519,
            "video": true
          },
          {
            "id": "194398",
            "title": "트랜잭션을 관리하기 위한 머클트리 작성하기",
            "seconds": 574,
            "video": true
          },
          {
            "id": "194399",
            "title": "생성된 Block관리를 위한 DB연결 및 디버깅",
            "seconds": 976,
            "video": true
          },
          {
            "id": "194400",
            "title": "os.Stdin을 통한 접근 제어 및 repository 접근 제한 설정하기",
            "seconds": 536,
            "video": true
          },
          {
            "id": "309955",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "194401",
        "title": "트랜잭션 생성하기",
        "units": [
          {
            "id": "194402",
            "title": "트랜잭션 생성코드 작성하기",
            "seconds": 491,
            "video": true
          },
          {
            "id": "195314",
            "title": "생성된 Tx에 대한 분기 처리 로직 구성하기",
            "seconds": 730,
            "video": true
          },
          {
            "id": "195315",
            "title": "Tx 생성을 처리할 Key 생성하기",
            "seconds": 863,
            "video": true
          },
          {
            "id": "195316",
            "title": "MintCoin 로직 처리 및 디버깅",
            "seconds": 1206,
            "video": true
          },
          {
            "id": "195317",
            "title": "TransferCoin 로직 처리 및 디버깅",
            "seconds": 540,
            "video": true
          },
          {
            "id": "309951",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "195319",
        "title": "끝맺음",
        "units": [
          {
            "id": "195320",
            "title": "수고하셨습니다!",
            "seconds": 135,
            "video": true
          }
        ]
      }
    ]
  },
  "42": {
    "title": "광고비 0원, 검색 유입만으로 쉽게 돈 벌자! AI 시대 맞춤 SEO",
    "url": "https://www.inflearn.com/course/%EA%B4%91%EA%B3%A0%EB%B9%84-0%EC%9B%90-%EA%B2%80%EC%83%89-%EC%9C%A0%EC%9E%85%EB%A7%8C%EC%9C%BC%EB%A1%9C-%EC%89%BD%EA%B2%8C-%EB%8F%88",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-11-10 15:51:29",
    "totalSeconds": 9427,
    "totalUnits": 9,
    "sections": [
      {
        "id": "364694",
        "title": "SEO VOD",
        "units": [
          {
            "id": "365027",
            "title": "SEO 개요 및 중요성",
            "seconds": 348,
            "video": true
          },
          {
            "id": "365023",
            "title": "Technical SEO",
            "seconds": 1320,
            "video": true
          },
          {
            "id": "365020",
            "title": "Onpage SEO",
            "seconds": 1772,
            "video": true
          },
          {
            "id": "365021",
            "title": "Contents SEO",
            "seconds": 1747,
            "video": true
          },
          {
            "id": "365025",
            "title": "Offpage SEO",
            "seconds": 398,
            "video": true
          },
          {
            "id": "365026",
            "title": "SEO Tool",
            "seconds": 425,
            "video": true
          },
          {
            "id": "365022",
            "title": "Black Hat",
            "seconds": 690,
            "video": true
          },
          {
            "id": "365024",
            "title": "GPT 활용_for SEO (1)",
            "seconds": 986,
            "video": true
          },
          {
            "id": "365019",
            "title": "GPT 활용_for SEO (2)",
            "seconds": 1741,
            "video": true
          },
          {
            "id": "375570",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "15": {
    "title": "카카오 면접관이 알려주는 반드시 알아야하는 Distributed Environment",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A9%B4%EC%A0%91%EA%B4%80%EA%B0%80-%EC%95%8C%EB%A0%A4%EC%A3%BC%EB%8A%94-%EB%B0%98%EB%93%9C%EC%8B%9C",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-12-15 19:14:37",
    "totalSeconds": 23275,
    "totalUnits": 29,
    "sections": [
      {
        "id": "382267",
        "title": "강의 소개",
        "units": [
          {
            "id": "382268",
            "title": "강의 소개",
            "seconds": 480,
            "video": true
          },
          {
            "id": "382613",
            "title": "이 강의에서 다루는 개념들에 대해서 실제로 더 Deep Dive하며 구현할 수 있는 강의 추천드려요!",
            "seconds": 0,
            "video": false
          },
          {
            "id": "382534",
            "title": "여러분들의 면접을 위한 강의 요약 파일 제공해드립니다.",
            "seconds": 0,
            "video": false
          },
          {
            "id": "382535",
            "title": "Test Code Source",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "382292",
        "title": "모놀리틱과 MSA",
        "units": [
          {
            "id": "382270",
            "title": "Monolithic vs Microservice Architecture",
            "seconds": 842,
            "video": true
          },
          {
            "id": "382271",
            "title": "Patterns Migrate Monolithic To MSA",
            "seconds": 1302,
            "video": true
          }
        ]
      },
      {
        "id": "382293",
        "title": "모듈화된 모놀리틱과 애플리케이션 아키텍처",
        "units": [
          {
            "id": "382272",
            "title": "모듈화된 Monolith 구조 (Modular Monolith)",
            "seconds": 743,
            "video": true
          },
          {
            "id": "382273",
            "title": "Clean Architecture &  Hexagonal Architecture",
            "seconds": 715,
            "video": true
          },
          {
            "id": "382274",
            "title": "Clean Architecture & Hexagonal Architecture의 의존성 규칙과 테스트 용이성",
            "seconds": 549,
            "video": true
          },
          {
            "id": "382275",
            "title": "[실습] Modular Monolith 살펴보기",
            "seconds": 487,
            "video": true
          },
          {
            "id": "382276",
            "title": "[실습] Clean Architecture 살펴보기",
            "seconds": 852,
            "video": true
          },
          {
            "id": "382277",
            "title": "[실습] Hexagonal Architecture 살펴보기",
            "seconds": 990,
            "video": true
          },
          {
            "id": "388106",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "382294",
        "title": "서비스 경계와 분해",
        "units": [
          {
            "id": "382279",
            "title": "서비스 경계 설정과 다양한 MSA 아키텍처 패턴 [ SAGA, CQRS ]",
            "seconds": 906,
            "video": true
          },
          {
            "id": "382278",
            "title": "서비스 분리 및 분해 [ Business, Database, BFF ]",
            "seconds": 1078,
            "video": true
          },
          {
            "id": "382280",
            "title": "도메인 주도 설계(DDD)와 서비스 경계",
            "seconds": 1274,
            "video": true
          },
          {
            "id": "382281",
            "title": "[실습] 복잡한 비즈니스 문제를 소프트웨어로 표현하는 방법 DDD",
            "seconds": 1555,
            "video": true
          },
          {
            "id": "388107",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "382295",
        "title": "비동기와 동기 표현",
        "units": [
          {
            "id": "382282",
            "title": "Asynchronous Communication & Message Broker",
            "seconds": 542,
            "video": true
          },
          {
            "id": "382283",
            "title": "Synchronous-Communication & Service-Communication",
            "seconds": 888,
            "video": true
          },
          {
            "id": "434826",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "382269",
        "title": "이외에도 다양한 시스템 패턴",
        "units": [
          {
            "id": "382284",
            "title": "서비스 데이터 집계를 위한 Aggregator Pattern",
            "seconds": 651,
            "video": true
          },
          {
            "id": "382285",
            "title": "BFF (Backend for Frontend) Pattern",
            "seconds": 705,
            "video": true
          },
          {
            "id": "382296",
            "title": "분산 환경에서의 Service Discrovery Pattern",
            "seconds": 823,
            "video": true
          },
          {
            "id": "388108",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "382286",
        "title": "분산환경 관점에서는 다양한 트레이드오프",
        "units": [
          {
            "id": "382287",
            "title": "Data Management Patterns [ CAP, Database per Service, Polyglot, Sharding ]",
            "seconds": 1027,
            "video": true
          },
          {
            "id": "382288",
            "title": "분산 아키텍처에서의 Resilience & Observability Patterns",
            "seconds": 1122,
            "video": true
          },
          {
            "id": "382289",
            "title": "분산 환경에서의 Testing Strategies",
            "seconds": 1131,
            "video": true
          },
          {
            "id": "382315",
            "title": "[실습] Unit Test & Jest Setting",
            "seconds": 1137,
            "video": true
          },
          {
            "id": "382316",
            "title": "[실습] Integration Test & E2E Test",
            "seconds": 692,
            "video": true
          },
          {
            "id": "382317",
            "title": "[실습] 서비스간의 계약 Contract(Pact) Test",
            "seconds": 606,
            "video": true
          },
          {
            "id": "382290",
            "title": "분산 환경에서의 Deployment Patterns",
            "seconds": 952,
            "video": true
          },
          {
            "id": "382291",
            "title": "Serverless Microservice Architecture",
            "seconds": 1226,
            "video": true
          },
          {
            "id": "388109",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ],
    "inflearnId": 340020,
    "dashboardUrl": "https://demo-sub.inflearn.com/course/카카오-개발자면접관가-알려주는-반드시/dashboard?cid=340020"
  },
  "5": {
    "title": "카프카 완벽 가이드 - 코어편",
    "url": "https://www.inflearn.com/course/%EC%B9%B4%ED%94%84%EC%B9%B4-%EC%99%84%EB%B2%BD%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%BD%94%EC%96%B4",
    "checkedOn": "2026-09-06",
    "updatedAt": "2025-05-13 16:40:20",
    "totalSeconds": 82386,
    "totalUnits": 149,
    "sections": [
      {
        "id": "123573",
        "title": "강의 소개 및 실습 환경 구성",
        "units": [
          {
            "id": "123574",
            "title": "강의 소개",
            "seconds": 437,
            "video": true
          },
          {
            "id": "125608",
            "title": "강의 커리큘럼 및 실습 코드 소개",
            "seconds": 366,
            "video": true
          },
          {
            "id": "124151",
            "title": "강의 교재 및 실습 코드 다운로드",
            "seconds": 0,
            "video": false
          },
          {
            "id": "124199",
            "title": "카프카 소개, 그리고 왜 카프카를 배워야 하는가?",
            "seconds": 696,
            "video": true
          },
          {
            "id": "123685",
            "title": "실습환경 구축 개요",
            "seconds": 554,
            "video": true
          },
          {
            "id": "123686",
            "title": "Oracle VirtualBox 설치",
            "seconds": 179,
            "video": true
          },
          {
            "id": "123688",
            "title": "VirtualBox에서 유분투(Ubuntu) 리눅스 설치 - 01",
            "seconds": 551,
            "video": true
          },
          {
            "id": "123689",
            "title": "VirtualBox에서 유분투(Ubuntu) 리눅스 설치 - 02",
            "seconds": 391,
            "video": true
          },
          {
            "id": "123690",
            "title": "유분투(Ubuntu)에 추가 SW 설치",
            "seconds": 373,
            "video": true
          },
          {
            "id": "125687",
            "title": "유분투(Ubuntu)에 고정 IP 할당하기",
            "seconds": 669,
            "video": true
          },
          {
            "id": "123691",
            "title": "유분투(Ubuntu)에 SSH를 위한 Client 환경 구성",
            "seconds": 418,
            "video": true
          },
          {
            "id": "123692",
            "title": "카프카(Kafka) 설치",
            "seconds": 715,
            "video": true
          },
          {
            "id": "123693",
            "title": "카프카 서버 기동",
            "seconds": 773,
            "video": true
          },
          {
            "id": "123694",
            "title": "카프카 서버 환경 설정",
            "seconds": 495,
            "video": true
          },
          {
            "id": "123695",
            "title": "컨플루언트 카프카(Confluent Kafka)와 아파치 카프카(Apache Kafka) 설치 파일 비교",
            "seconds": 345,
            "video": true
          },
          {
            "id": "293468",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123696",
        "title": "Kakfa Topic, Producer, Consumer  이해 및 CLI로 실습 해보기",
        "units": [
          {
            "id": "123900",
            "title": "카프카, 시작하며",
            "seconds": 178,
            "video": true
          },
          {
            "id": "123697",
            "title": "Topic과 Partition 그리고 카프카 병렬 분산 처리 개요",
            "seconds": 951,
            "video": true
          },
          {
            "id": "123698",
            "title": "kafka-topics 명령어를 이용하여 Topic 생성 및 정보 확인하기",
            "seconds": 731,
            "video": true
          },
          {
            "id": "123699",
            "title": "Producer와 Consumer 개요",
            "seconds": 346,
            "video": true
          },
          {
            "id": "123700",
            "title": "kafka-console-producer와 kafka-console-consumer로 Producer와 Consumer 실습",
            "seconds": 749,
            "video": true
          },
          {
            "id": "123901",
            "title": "Producer의 객체 직렬화(Serializer) 전송의 이해",
            "seconds": 606,
            "video": true
          },
          {
            "id": "123902",
            "title": "Key값을 가지는 메시지의 전송",
            "seconds": 756,
            "video": true
          },
          {
            "id": "123903",
            "title": "여러 개의 파티션을 가지는 메시지 전송 실습",
            "seconds": 636,
            "video": true
          },
          {
            "id": "123904",
            "title": "Key가 없는 메시지의 파티션 분배전략 - 라운드로빈과 스티키 파티셔닝",
            "seconds": 688,
            "video": true
          },
          {
            "id": "123905",
            "title": "Consumer Group과 Consumer의 이해",
            "seconds": 460,
            "video": true
          },
          {
            "id": "123906",
            "title": "Consumer Group과 Consumer Rebalancing 실습",
            "seconds": 345,
            "video": true
          },
          {
            "id": "123907",
            "title": "kafka-consumer-groups 명령어로 Consumer Group과 Consumer, Lag 정보 확인하기",
            "seconds": 760,
            "video": true
          },
          {
            "id": "123908",
            "title": "kafka-consumer-groups 명령어로 Consumer Group 삭제하기",
            "seconds": 183,
            "video": true
          },
          {
            "id": "123909",
            "title": "카프카 환경 파라미터의 구분 및 kafka-configs 명령어로 파라미터 검색 및 수정 적용하기",
            "seconds": 599,
            "video": true
          },
          {
            "id": "125434",
            "title": "kafka-dump-log 명령어로 로그 파일의 메시지 내용 확인하기",
            "seconds": 394,
            "video": true
          },
          {
            "id": "292714",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123702",
        "title": "Java 기반 Producer 구현 실습 및 Producer 내부 메커니즘 이해 - 01",
        "units": [
          {
            "id": "124181",
            "title": "Java기반의 카프카 클라이언트 구현 실습을 시작하며",
            "seconds": 158,
            "video": true
          },
          {
            "id": "123703",
            "title": "Java 기반 카프카 클라이언트(Client) 구현 실습을 위한 JDK및 Intellij 설치",
            "seconds": 546,
            "video": true
          },
          {
            "id": "123704",
            "title": "Java 기반 카프카 클라이언트 구현을 위한 Intellij 프로젝트 설정 및 멀티 Module 설정하기",
            "seconds": 375,
            "video": true
          },
          {
            "id": "123705",
            "title": "카프카 Java 클라이언트 라이브러리 Gradle로 설정하기",
            "seconds": 370,
            "video": true
          },
          {
            "id": "123706",
            "title": "Java 기반에서 Producer 구현하기 - 01",
            "seconds": 684,
            "video": true
          },
          {
            "id": "123707",
            "title": "Java 기반에서 Producer 구현하기 - 02",
            "seconds": 619,
            "video": true
          },
          {
            "id": "123708",
            "title": "Producer Java 클라이언트 API 내부를 Intellij Debugger를 이용하여 살짝 뜯어보기",
            "seconds": 522,
            "video": true
          },
          {
            "id": "123709",
            "title": "Producer의 메시지 동기화 전송 구현",
            "seconds": 723,
            "video": true
          },
          {
            "id": "123710",
            "title": "Callback을 이용한 Producer의 메시지 비동기화 전송 이해",
            "seconds": 824,
            "video": true
          },
          {
            "id": "123711",
            "title": "Producer의 메시지 비동기화 전송 구현",
            "seconds": 706,
            "video": true
          },
          {
            "id": "123712",
            "title": "Producer에서 키(Key)값을 가지는 메시지 전송 구현",
            "seconds": 722,
            "video": true
          },
          {
            "id": "123713",
            "title": "Producer에서 키(Key) 타입의 변경 및 Custom Callback 구현",
            "seconds": 837,
            "video": true
          },
          {
            "id": "123714",
            "title": "피자 주문 시뮬레이션 Producer 구현: 피자 주문 메시지 생성",
            "seconds": 650,
            "video": true
          },
          {
            "id": "123715",
            "title": "피자 주문 시뮬레이션 Producer 구현: 피자 주문 Producer 구현 - 01",
            "seconds": 980,
            "video": true
          },
          {
            "id": "123716",
            "title": "피자 주문 시뮬레이션 Producer 구현: 피자 주문 Producer 구현 - 02",
            "seconds": 849,
            "video": true
          },
          {
            "id": "293469",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123717",
        "title": "Java 기반 Producer 구현 실습 및 Producer 내부 메커니즘 이해 - 02",
        "units": [
          {
            "id": "123718",
            "title": "acks 값 설정에 따른 Producer의 전송 방식 차이 이해",
            "seconds": 603,
            "video": true
          },
          {
            "id": "123719",
            "title": "Producer의 acks 설정 관련 실습",
            "seconds": 254,
            "video": true
          },
          {
            "id": "123720",
            "title": "Producer의 메시지 배치 전송 내부 메커니즘 - Record Batch와 Record Accumulator 이해",
            "seconds": 570,
            "video": true
          },
          {
            "id": "123721",
            "title": "Producer의 메시지 배치 전송 내부 메커니즘 - linger.ms와 batch.size 파라미터 고찰",
            "seconds": 562,
            "video": true
          },
          {
            "id": "123722",
            "title": "Producer의 동기(Sync)와 비동기(Async)에서 배치 전송 차이",
            "seconds": 422,
            "video": true
          },
          {
            "id": "123723",
            "title": "Producer의 전송/재전송 내부 메커니즘 및 재 전송 동작 관련 주요 파라미터의 이해",
            "seconds": 407,
            "video": true
          },
          {
            "id": "123724",
            "title": "Producer의 재전송 관련 주요 파라미터 설정에 따른 동작 실습",
            "seconds": 482,
            "video": true
          },
          {
            "id": "123725",
            "title": "Producer의 max.in.flight.requests.per.connection 파라미터와 배치 메시지의 전송순서 이해",
            "seconds": 496,
            "video": true
          },
          {
            "id": "123726",
            "title": "최대 한번전송, 적어도 한번전송, 정확히 한번전송 이해",
            "seconds": 543,
            "video": true
          },
          {
            "id": "123727",
            "title": "idempotence(멱등성) 기반 중복 없이 전송 이해",
            "seconds": 539,
            "video": true
          },
          {
            "id": "124177",
            "title": "Producer에 idempotence(중복 없이 전송) 설정 및 설정 시 유의 사항",
            "seconds": 576,
            "video": true
          },
          {
            "id": "125528",
            "title": "커스텀 파티셔너(Custom Partitioner) 구현하기 - 01",
            "seconds": 652,
            "video": true
          },
          {
            "id": "125529",
            "title": "커스텀 파티셔너(Custom Partitioner) 구현하기 - 02",
            "seconds": 1125,
            "video": true
          },
          {
            "id": "125530",
            "title": "커스텀 파티셔너(Custom Partitioner) 구현하기 - 03",
            "seconds": 463,
            "video": true
          },
          {
            "id": "293727",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123728",
        "title": "Java 기반 Consumer 구현 실습 및 Consumer 내부 메커니즘 이해 - 01",
        "units": [
          {
            "id": "123729",
            "title": "Consumer의 주요 메커니즘 개요",
            "seconds": 406,
            "video": true
          },
          {
            "id": "123730",
            "title": "Java 기반에서 Consumer 구현하기 - 01",
            "seconds": 605,
            "video": true
          },
          {
            "id": "123731",
            "title": "Java 기반에서 Consumer 구현하기 - 02",
            "seconds": 997,
            "video": true
          },
          {
            "id": "123732",
            "title": "KafkaConsumer클래스의 주요 구성 요소와 poll( ) 메소드 동작 메커니즘의 이해",
            "seconds": 485,
            "video": true
          },
          {
            "id": "123733",
            "title": "Intellij Debugger를 이용하여 KafkaConsumer의 주요 구성 요소 확인해 보기",
            "seconds": 235,
            "video": true
          },
          {
            "id": "123734",
            "title": "Consumer Fetcher관련 주요 파라미터와 Fetcher 메커니즘의 이해",
            "seconds": 803,
            "video": true
          },
          {
            "id": "123735",
            "title": "Wakeup을 이용하여 Consumer를 효과적으로 종료하기",
            "seconds": 725,
            "video": true
          },
          {
            "id": "123736",
            "title": "Consumer의 읽기 commit 메커니즘 이해: __consumer_offsets 내부 토픽 뜯어보기",
            "seconds": 665,
            "video": true
          },
          {
            "id": "123737",
            "title": "Consumer와 auto.offset.reset의 내부 동작 메커니즘 상세 이해",
            "seconds": 930,
            "video": true
          },
          {
            "id": "293618",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123738",
        "title": "Java 기반 Consumer 구현 실습 및 Consumer 내부 메커니즘 이해 - 02",
        "units": [
          {
            "id": "123739",
            "title": "Intellij에서 동일 프로그램을 여러 개의 인스턴스로 동시에 구동하기",
            "seconds": 188,
            "video": true
          },
          {
            "id": "123740",
            "title": "신규 Consumer 생성에 따른 Rebalance 실습",
            "seconds": 500,
            "video": true
          },
          {
            "id": "123741",
            "title": "Group Coordinator와 Consumer의 Rebalance 상세 메커니즘 이해",
            "seconds": 488,
            "video": true
          },
          {
            "id": "124125",
            "title": "<공지> 실습 시 Consumer Group id 변경 관련 공지",
            "seconds": 138,
            "video": true
          },
          {
            "id": "123742",
            "title": "Group Coordinator와 Consumer의 Rebalance 메커니즘 동작 실습",
            "seconds": 577,
            "video": true
          },
          {
            "id": "123743",
            "title": "Consumer 스태틱 그룹 멤버쉽(Static Group Membership)의 이해",
            "seconds": 286,
            "video": true
          },
          {
            "id": "123744",
            "title": "Consumer 스태틱 그룹 멤버쉽(Static Group Membership) 동작 실습",
            "seconds": 628,
            "video": true
          },
          {
            "id": "123745",
            "title": "Heartbeat 스레드(Thread)와 관련 주요 파라미터들의 이해",
            "seconds": 461,
            "video": true
          },
          {
            "id": "123746",
            "title": "Heartbeat 스레드(Thread)와 관련 주요 파라미터들 설정 및 동작 실습",
            "seconds": 602,
            "video": true
          },
          {
            "id": "123747",
            "title": "max.poll.interval.ms 설정값에 따른 loop 내에서 poll( ) 메소드 수행 상세 이해 및 동작 실습",
            "seconds": 823,
            "video": true
          },
          {
            "id": "123748",
            "title": "Consumer에서 여러 개의 Topic 읽기",
            "seconds": 448,
            "video": true
          },
          {
            "id": "123749",
            "title": "Consumer Rebalance의 Eager 모드와 Cooperative 모드 이해",
            "seconds": 428,
            "video": true
          },
          {
            "id": "123750",
            "title": "Consumer의 파티션 할당 전략 이해",
            "seconds": 852,
            "video": true
          },
          {
            "id": "123751",
            "title": "Consumer 파티션 할당 전략 실습 - Range와 Round Robin 방식 할당 실습",
            "seconds": 810,
            "video": true
          },
          {
            "id": "123823",
            "title": "Consumer 파티션 할당 전략 실습 - Cooperative Sticky 방식 할당 실습",
            "seconds": 496,
            "video": true
          },
          {
            "id": "293951",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123752",
        "title": "Java 기반 Consumer 구현 실습 및 Consumer 내부 메커니즘 이해 - 03",
        "units": [
          {
            "id": "123753",
            "title": "Consumer의 읽기 Offset Commit(커밋)과 중복 읽기 상황의 이해",
            "seconds": 696,
            "video": true
          },
          {
            "id": "123754",
            "title": "Consumer의 Auto Commit(자동 커밋) 이해",
            "seconds": 289,
            "video": true
          },
          {
            "id": "123755",
            "title": "Auto Commit 적용 실습",
            "seconds": 657,
            "video": true
          },
          {
            "id": "123756",
            "title": "Auto Commit 적용 시 Consumer의 중복 읽기 상황 발생 실습",
            "seconds": 439,
            "video": true
          },
          {
            "id": "123757",
            "title": "Consumer의 동기 및 비동기 Manual Commit(수동 커밋) 이해",
            "seconds": 310,
            "video": true
          },
          {
            "id": "123758",
            "title": "동기 방식 Manual Commit 구현 실습",
            "seconds": 523,
            "video": true
          },
          {
            "id": "123759",
            "title": "비동기 방식 Manual Commit 구현 실습",
            "seconds": 649,
            "video": true
          },
          {
            "id": "123760",
            "title": "Consumer에서 토픽의 특정 파티션만 명시적으로 할당하기 구현 실습",
            "seconds": 587,
            "video": true
          },
          {
            "id": "123761",
            "title": "Consumer에서 토픽 특정 파티션의 특정 offset 부터 읽어오기 구현 실습",
            "seconds": 726,
            "video": true
          },
          {
            "id": "294164",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123762",
        "title": "실전 카프카 Producer 애플리케이션 구현",
        "units": [
          {
            "id": "123763",
            "title": "실전 Producer Application 구현을 위한 Intellij 환경 구성",
            "seconds": 160,
            "video": true
          },
          {
            "id": "123764",
            "title": "파일을 읽어서 메시지를 전송하는 Producer 구현 - 01",
            "seconds": 805,
            "video": true
          },
          {
            "id": "123765",
            "title": "파일을 읽어서 메시지를 전송하는 Producer 구현 - 02",
            "seconds": 371,
            "video": true
          },
          {
            "id": "123766",
            "title": "pizza_sample.txt 파일 수정 공지",
            "seconds": 163,
            "video": true
          },
          {
            "id": "123767",
            "title": "파일을 모니터링하여 텍스트가 추가될 때마다 메시지를 전송하는 Producer 구현 개요",
            "seconds": 278,
            "video": true
          },
          {
            "id": "123768",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer 구현 - EventHandler 구현",
            "seconds": 883,
            "video": true
          },
          {
            "id": "123769",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer 구현 - 파일 모니터링 스레드 구현",
            "seconds": 828,
            "video": true
          },
          {
            "id": "123770",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer 구현 - 메시지 전송 구현",
            "seconds": 1113,
            "video": true
          },
          {
            "id": "123771",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer 구현 - 최종 구동",
            "seconds": 545,
            "video": true
          },
          {
            "id": "294365",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123772",
        "title": "실전 카프카 Consumer 애플리케이션 구현",
        "units": [
          {
            "id": "123773",
            "title": "실전 Consumer Application 구현 개요",
            "seconds": 340,
            "video": true
          },
          {
            "id": "123774",
            "title": "BaseConsumer 구현 개요",
            "seconds": 603,
            "video": true
          },
          {
            "id": "123775",
            "title": "BaseConsumer 구현 - 01",
            "seconds": 711,
            "video": true
          },
          {
            "id": "123776",
            "title": "BaseConsumer 구현 - 02",
            "seconds": 461,
            "video": true
          },
          {
            "id": "123777",
            "title": "메시지를 읽어 DB에 입력하는 FileToDBConsumer 구현 개요",
            "seconds": 480,
            "video": true
          },
          {
            "id": "123778",
            "title": "PostgreSQL 설치하기",
            "seconds": 829,
            "video": true
          },
          {
            "id": "123779",
            "title": "JDBC로 PostgreSQL 접속 테스트",
            "seconds": 298,
            "video": true
          },
          {
            "id": "123780",
            "title": "메시지를 읽어 DB에 입력하는 FileToDBConsumer 구현 - 01",
            "seconds": 943,
            "video": true
          },
          {
            "id": "123781",
            "title": "메시지를 읽어 DB에 입력하는 FileToDBConsumer 구현 - 02",
            "seconds": 714,
            "video": true
          },
          {
            "id": "123782",
            "title": "텍스트 추가시 메시지 전송하는 Producer 및 FileToDBConsumer의 통합 구동 테스트",
            "seconds": 571,
            "video": true
          },
          {
            "id": "294010",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123783",
        "title": "멀티 노드 카프카 클러스터",
        "units": [
          {
            "id": "123784",
            "title": "멀티 노드 카프카 클러스터 개요 및 분산 시스템 장단점",
            "seconds": 715,
            "video": true
          },
          {
            "id": "123785",
            "title": "3개의 멀티 브로커로 카프카 구성하기",
            "seconds": 992,
            "video": true
          },
          {
            "id": "150528",
            "title": "<중요> 멀티 브로커용 Zookeeper 설정에 따른 변경 공지",
            "seconds": 132,
            "video": true
          },
          {
            "id": "123786",
            "title": "멀티 브로커 카프카에서 여러 개의 파티션을 가지는 다중 복제 토픽 만들기",
            "seconds": 652,
            "video": true
          },
          {
            "id": "123787",
            "title": "카프카 Replication(복제)와 리더(Leader)/팔로워(Follower) 이해",
            "seconds": 690,
            "video": true
          },
          {
            "id": "123788",
            "title": "카프카 Replication(복제)와 리더(Leader)/팔로워(Follower) 실습",
            "seconds": 677,
            "video": true
          },
          {
            "id": "123789",
            "title": "멀티 브로커 환경에서 Producer의 bootstrap.servers 설정 이해",
            "seconds": 742,
            "video": true
          },
          {
            "id": "123790",
            "title": "주키퍼(Zookeeper)와 컨트롤러(Controller) 브로커의 이해",
            "seconds": 544,
            "video": true
          },
          {
            "id": "123791",
            "title": "zookeeper_shell 명령어를 이용하여 주키퍼와 카프카 기동 메커니즘 이해 및 실습",
            "seconds": 662,
            "video": true
          },
          {
            "id": "123792",
            "title": "컨트롤러의 리더 선출(Leader Election) 프로세스 이해",
            "seconds": 266,
            "video": true
          },
          {
            "id": "123793",
            "title": "컨트롤러의 리더 선출(Leader Election) 프로세스 실습",
            "seconds": 439,
            "video": true
          },
          {
            "id": "123794",
            "title": "컨트롤러의 리더 선출(Leader Election) 프로세스 실습 후 공지",
            "seconds": 185,
            "video": true
          },
          {
            "id": "123795",
            "title": "ISR(In-Sync_Replicas)의 이해",
            "seconds": 586,
            "video": true
          },
          {
            "id": "123796",
            "title": "min.insync.replicas 설정에 따른 Producer 전송 이해",
            "seconds": 306,
            "video": true
          },
          {
            "id": "123797",
            "title": "Preferred Leader Election 이해 및 실습",
            "seconds": 691,
            "video": true
          },
          {
            "id": "123798",
            "title": "Unclean Leader Election 이해 및 실습",
            "seconds": 428,
            "video": true
          },
          {
            "id": "294204",
            "title": "섹션 10 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123799",
        "title": "컨플루언트 플랫폼(Confluent Platform)에서 카프카 모니터링",
        "units": [
          {
            "id": "123854",
            "title": "카프카 관리/모니터링 UI - 컨플루언트 Control Center 소개",
            "seconds": 405,
            "video": true
          },
          {
            "id": "123855",
            "title": "컨플루언트 카프카 Local 설치하기",
            "seconds": 495,
            "video": true
          },
          {
            "id": "123856",
            "title": "컨플루언트 카프카 Local을 서비스로 기동하기",
            "seconds": 568,
            "video": true
          },
          {
            "id": "123857",
            "title": "컨플루언트 Control Center로 Topic 생성 및 모니터링",
            "seconds": 479,
            "video": true
          },
          {
            "id": "123858",
            "title": "컨플루언트 Control Center로 Consumer 모니터링",
            "seconds": 420,
            "video": true
          },
          {
            "id": "123859",
            "title": "컨플루언트 카프카 Community 버전으로 실습환경 되돌리기",
            "seconds": 154,
            "video": true
          },
          {
            "id": "293759",
            "title": "섹션 11 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "123800",
        "title": "Producer와 Consumer의 Custom 객체 직렬화/역직렬화",
        "units": [
          {
            "id": "123801",
            "title": "Producer와 Consumer의 Custom 객체 직렬화 및 역직렬화 적용 개요",
            "seconds": 614,
            "video": true
          },
          {
            "id": "123802",
            "title": "Jackson databind 라이브러리 설치 및 Producer의 Custom 객체 직렬화 구현 개요",
            "seconds": 460,
            "video": true
          },
          {
            "id": "123803",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer의 Custom 객체 직렬화 구현 - 01",
            "seconds": 580,
            "video": true
          },
          {
            "id": "123804",
            "title": "텍스트가 추가될 때마다 메시지를 전송하는 Producer의 Custom 객체 직렬화 구현 - 02",
            "seconds": 722,
            "video": true
          },
          {
            "id": "123805",
            "title": "Consumer의 Customer 객체 역직렬화 구현 - 01",
            "seconds": 776,
            "video": true
          },
          {
            "id": "123806",
            "title": "Consumer의 Customer 객체 역직렬화 구현 - 02",
            "seconds": 170,
            "video": true
          },
          {
            "id": "294445",
            "title": "섹션 12 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "125531",
        "title": "토픽의 세그먼트(Segment) 관리",
        "units": [
          {
            "id": "125532",
            "title": "메시지 로그 세그먼트의 이해",
            "seconds": 506,
            "video": true
          },
          {
            "id": "125533",
            "title": "세그먼트의 구성 및 rolling 메커니즘 실습",
            "seconds": 743,
            "video": true
          },
          {
            "id": "125534",
            "title": "kafka-dump-log 명령어로 세그먼트내 메시지 로그 살펴 보기",
            "seconds": 263,
            "video": true
          },
          {
            "id": "125535",
            "title": "인덱스(Index)와 타임인덱스(TimeIndex) 세그먼트의 이해",
            "seconds": 593,
            "video": true
          },
          {
            "id": "125536",
            "title": "세그먼트의 생명 주기 관리 및 log.cleanup.policy의 삭제(delete) 설정 이해",
            "seconds": 575,
            "video": true
          },
          {
            "id": "125537",
            "title": "log.cleanup.policy의 삭제(delete) 설정에 따른 세그먼트 삭제 메커니즘 실습",
            "seconds": 753,
            "video": true
          },
          {
            "id": "125598",
            "title": "Log Compaction의 이해 - 01",
            "seconds": 414,
            "video": true
          },
          {
            "id": "125599",
            "title": "Log Compaction의 이해 - 02",
            "seconds": 870,
            "video": true
          },
          {
            "id": "125600",
            "title": "Log Compaction 실습",
            "seconds": 900,
            "video": true
          },
          {
            "id": "294567",
            "title": "섹션 13 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "125609",
        "title": "맺으며",
        "units": [
          {
            "id": "125610",
            "title": "맺으며, 그리고",
            "seconds": 68,
            "video": true
          }
        ]
      }
    ]
  },
  "39": {
    "title": "주식투자 뉴스, 공시 등 재료를 공부하실 수 있는 가이드북을 드립니다.",
    "url": "https://www.inflearn.com/course/%EC%A3%BC%EC%8B%9D%ED%88%AC%EC%9E%90-%EB%89%B4%EC%8A%A4-%EC%9E%AC%EB%A3%8C-%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81",
    "checkedOn": "2026-09-06",
    "updatedAt": "2022-08-08 09:00:00",
    "totalSeconds": 0,
    "totalUnits": 19,
    "sections": [
      {
        "id": "119597",
        "title": "재료 매매 바이블",
        "units": [
          {
            "id": "119598",
            "title": "재료의 중요성과 이론 & 재료의 종류",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119599",
            "title": "재료를 보는 관점 && 재료 매매의 밑그림",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119600",
            "title": "기대감의 연속성과 지속성 && 재료 매매 기타 필독 사항",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119613",
            "title": "재료 매매 가이드북 4권",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308401",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "119601",
        "title": "재료 매매 가이드북 1권",
        "units": [
          {
            "id": "119602",
            "title": "공시에 대한 이해와 중요성 && 유상증자",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119603",
            "title": "무상증자 && 사례 공부",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119604",
            "title": "주식연계채권 && 단일 판매 공급계약 && 텔레그램 활용",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308376",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "119605",
        "title": "재료 매매 가이드북 2권",
        "units": [
          {
            "id": "119606",
            "title": "뉴스에 대한 이해와 중요성 && 재료(뉴스)의 종류",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119607",
            "title": "세계 최초, 국내 유일 뉴스 && 게임 테마 분석",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119608",
            "title": "영화 드라마 테마 분석 && 재료 소멸은 매매 금지",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308393",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "119609",
        "title": "재료 매매 가이드북 3권",
        "units": [
          {
            "id": "119610",
            "title": "IPO 신규 상장 테마 분석",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119611",
            "title": "대기업과 관련된 재료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119612",
            "title": "기타 재료 (리비안 상장) - 제2의 테슬라",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308294",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "119614",
        "title": "재료 매매 가이드북 4권",
        "units": [
          {
            "id": "119615",
            "title": "기업의 공개 매각",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119616",
            "title": "경영권 분쟁 재료 분석",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119617",
            "title": "시기별 행사 일정 매매",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308361",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "119618",
        "title": "재료 매매 가이드북 5권",
        "units": [
          {
            "id": "119619",
            "title": "정치 테마주 매매 관점",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119620",
            "title": "정부 정책과 관련된 재료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "119621",
            "title": "반복적인 재료 VS 신선한 재료",
            "seconds": 0,
            "video": false
          },
          {
            "id": "308457",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "19": {
    "title": "금융 인프라를 운영하는 Toss 개발자의 Docker",
    "url": "https://www.inflearn.com/course/docker-for-toss-deve",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-03-10 13:18:08",
    "totalSeconds": 21747,
    "totalUnits": 23,
    "sections": [
      {
        "id": "414139",
        "title": "강의 소개",
        "units": [
          {
            "id": "414140",
            "title": "강의 소개",
            "seconds": 409,
            "video": true
          }
        ]
      },
      {
        "id": "414211",
        "title": "Docker 소개 및 환경설정",
        "units": [
          {
            "id": "414202",
            "title": "Docker의 탄생 배경, 가상머신과의 차이, 아키텍처, 그리고 macOS에서의 동작 방식",
            "seconds": 1008,
            "video": true
          },
          {
            "id": "414203",
            "title": "Docker 가장 기본적인 명령어 실행하며 맛보기",
            "seconds": 546,
            "video": true
          },
          {
            "id": "414204",
            "title": "Docker의 기본 개념들 Image, Container, Layer",
            "seconds": 731,
            "video": true
          },
          {
            "id": "451404",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "414201",
        "title": "Docker Image와 Container 기본 조작",
        "units": [
          {
            "id": "414205",
            "title": "Docker Image 활용을 위한 기본 명령어",
            "seconds": 684,
            "video": true
          },
          {
            "id": "414206",
            "title": "Docker Hub를 활용한 이미지 선택 패턴",
            "seconds": 988,
            "video": true
          },
          {
            "id": "414207",
            "title": "Docker Image Layer를 활용한 Cache 패턴과 Dangling Image",
            "seconds": 735,
            "video": true
          },
          {
            "id": "414208",
            "title": "Docker Container 생성과 실행 [ 백그라운드 vs 포그라운드 ]",
            "seconds": 673,
            "video": true
          },
          {
            "id": "414209",
            "title": "Docker Container의 생명 주기 관리와 실시간 로그 확인",
            "seconds": 1270,
            "video": true
          },
          {
            "id": "414210",
            "title": "Docker Container와의 상호작용을 위한 필수 명령어",
            "seconds": 1220,
            "video": true
          },
          {
            "id": "451403",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "416097",
        "title": "Container에 적용 가능한 다양한 Docker 기능 및 최적화 패턴",
        "units": [
          {
            "id": "416098",
            "title": "Container 포트 연결을 위한 포트 매핑 및 통신 실습",
            "seconds": 611,
            "video": true
          },
          {
            "id": "416099",
            "title": "컨테이너 환경 변수 전달 패턴 및 MySQL 실행 및 프롬프트 접속하기",
            "seconds": 1020,
            "video": true
          },
          {
            "id": "416100",
            "title": "Docker Container만이 가지고 있는 레이어 구조의 데이터 영속성 문제",
            "seconds": 700,
            "video": true
          },
          {
            "id": "416101",
            "title": "Container의 데이터 영속성을 위한 Volume Mount 패턴",
            "seconds": 906,
            "video": true
          },
          {
            "id": "416102",
            "title": "외부 저장소를 활용한 데이터 영속성 관리 Named Volume 패턴",
            "seconds": 1161,
            "video": true
          },
          {
            "id": "416103",
            "title": "나만의 이미지 작성을 위한 Dockerfile 기초부터 뜯어보기",
            "seconds": 1811,
            "video": true
          },
          {
            "id": "416104",
            "title": "Dockerfile 최적화를 위한 빌드 캐싱 및 멀티 스테이지 빌드 패턴",
            "seconds": 1084,
            "video": true
          },
          {
            "id": "451405",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "416107",
        "title": "Docker Container 통신을 지원하는 Network 및 Docker Compose",
        "units": [
          {
            "id": "416105",
            "title": "Docker Network의 기본 3가지 Network 기초 과정",
            "seconds": 825,
            "video": true
          },
          {
            "id": "416525",
            "title": "사용자 정의 Docker Network를 활용한 멀티 컨테이너 통신 실습",
            "seconds": 1370,
            "video": true
          },
          {
            "id": "416526",
            "title": "쿠버네티스 철학을 근간 선언적 관리를 위한 Docker Compose",
            "seconds": 1526,
            "video": true
          },
          {
            "id": "451402",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "416391",
        "title": "실제 실무 Project 관리를 위한 Docker",
        "units": [
          {
            "id": "416527",
            "title": "Docker 공식 Hub를 활용한 나만의 Image 오픈하기",
            "seconds": 678,
            "video": true
          },
          {
            "id": "416392",
            "title": "GHCR ( GitHub Container Registry ) 을 활용한 Private Docker Registry",
            "seconds": 1110,
            "video": true
          },
          {
            "id": "416528",
            "title": "CI/CD 파이프라인에서의 Docker 활용 [ 템플릿 제공 ]",
            "seconds": 681,
            "video": true
          },
          {
            "id": "451406",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "23": {
    "title": "실전에서 바로 써먹는 Elasticsearch 입문 (검색 최적화편)",
    "url": "https://www.inflearn.com/course/%EC%8B%A4%EC%A0%84-elasticsearch-%EC%9E%85%EB%AC%B8",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-30 20:26:37",
    "totalSeconds": 25028,
    "totalUnits": 74,
    "sections": [
      {
        "id": "291231",
        "title": "꼭!꼭! 들어봐야 하는 오리엔테이션 🦆",
        "units": [
          {
            "id": "291232",
            "title": "강의 소개",
            "seconds": 134,
            "video": true
          },
          {
            "id": "300777",
            "title": "소통하면서 듣는 인터넷 강의?!",
            "seconds": 111,
            "video": true
          },
          {
            "id": "300778",
            "title": "[학습 Tip] 강의를 다 듣고나서 스스로 구현할 수 있으려면?",
            "seconds": 197,
            "video": true
          },
          {
            "id": "412632",
            "title": "[공지] 강의 자료 저작권 관련",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300779",
            "title": "[학습 Tip] 파레토의 법칙",
            "seconds": 118,
            "video": true
          },
          {
            "id": "300780",
            "title": "[학습 Tip] First Word 법칙",
            "seconds": 77,
            "video": true
          },
          {
            "id": "300781",
            "title": "[학습 Tip] 주석 공부법",
            "seconds": 138,
            "video": true
          },
          {
            "id": "300782",
            "title": "1:1 오픈 톡방(질문) / 마음의 소리함",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300783",
            "title": "수업 자료 (Notion)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "315313",
            "title": "수업 자료 (PDF)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300951",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300768",
        "title": "Elasticsearch 기본 개념",
        "units": [
          {
            "id": "300784",
            "title": "Elasticsearch란? / Elasticsearch 주요 활용 사례",
            "seconds": 234,
            "video": true
          },
          {
            "id": "300785",
            "title": "Elasticsearch 설치하기",
            "seconds": 241,
            "video": true
          },
          {
            "id": "300786",
            "title": "Elasticsearch 작동 방식 / GUI 툴",
            "seconds": 328,
            "video": true
          },
          {
            "id": "300787",
            "title": "GUI 툴로 Elasticsearch 훨씬 쉽게 조작하기 (feat. Kibana)",
            "seconds": 310,
            "video": true
          },
          {
            "id": "300788",
            "title": "Elasticsearch의 기본 용어 정리 (인덱스, 도큐먼트, 매핑, 필드)",
            "seconds": 374,
            "video": true
          },
          {
            "id": "300789",
            "title": "인덱스 생성하기 / 매핑 정의하기 / 도큐먼트 삽입하기",
            "seconds": 663,
            "video": true
          },
          {
            "id": "300790",
            "title": "도큐먼트 저장, 조회, 수정, 삭제하기",
            "seconds": 690,
            "video": true
          },
          {
            "id": "300950",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300769",
        "title": "Spring Boot, Elasitcsearch를 활용해 CRUD 구현하기",
        "units": [
          {
            "id": "300791",
            "title": "[실습] Spring Boot에 Elasticsearch 연결하기 (feat. Spring Data Elasticsearch)",
            "seconds": 762,
            "video": true
          },
          {
            "id": "300792",
            "title": "[실습] Elasticsearch를 활용해 CRUD API 만들기",
            "seconds": 961,
            "video": true
          }
        ]
      },
      {
        "id": "300771",
        "title": "기본 검색 기능 및 작동 원리",
        "units": [
          {
            "id": "300793",
            "title": "단어의 순서가 바뀌어도 검색이 가능하다 ?!",
            "seconds": 140,
            "video": true
          },
          {
            "id": "300794",
            "title": "[실습] Elasitcsearch의 검색 기능 테스트해보기",
            "seconds": 291,
            "video": true
          },
          {
            "id": "300795",
            "title": "역인덱스(Inverted Index)란?",
            "seconds": 488,
            "video": true
          },
          {
            "id": "300796",
            "title": "[실습] 역인덱스(Inverted Index)를 활용한 데이터 조회",
            "seconds": 486,
            "video": true
          },
          {
            "id": "300797",
            "title": "애널라이저(Analyzer)란?",
            "seconds": 505,
            "video": true
          },
          {
            "id": "300798",
            "title": "Elasticsearch에 기본값으로 설정되어 있는 애널라이저(Analyzer)",
            "seconds": 328,
            "video": true
          },
          {
            "id": "300799",
            "title": "[실습] 애널라이저(Analyzer)가 토큰을 어떻게 나누는 지 확인하는 방법",
            "seconds": 269,
            "video": true
          },
          {
            "id": "300800",
            "title": "[실습] 대소문자 구분없이 검색하는 방법 (lowercase)",
            "seconds": 737,
            "video": true
          },
          {
            "id": "300801",
            "title": "[실습] 검색할 때 필요없는 HTML 태그 제거하기 (html_strip)",
            "seconds": 516,
            "video": true
          },
          {
            "id": "300802",
            "title": "[실습] 검색할 때 필요없는 불용어(a, an, the, or, but) 제거하기 (stop)",
            "seconds": 320,
            "video": true
          },
          {
            "id": "300803",
            "title": "[실습] 단어의 형태(-ed, -ing, -s 등)에 상관없이 검색하는 방법 (stemmer)",
            "seconds": 355,
            "video": true
          },
          {
            "id": "300804",
            "title": "[실습] 동의어로 검색하는 방법 (synonym)",
            "seconds": 411,
            "video": true
          },
          {
            "id": "300952",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300770",
        "title": "한글에 최적화된 검색 기능",
        "units": [
          {
            "id": "300805",
            "title": "한글(korean)이 제대로 검색되지 않는 현상",
            "seconds": 311,
            "video": true
          },
          {
            "id": "300806",
            "title": "[실습] Nori Analyzer를 활용해 한글(korean)이 제대로 검색되게 만들기",
            "seconds": 495,
            "video": true
          },
          {
            "id": "300807",
            "title": "[실습] 한글(korean)과 영어(english)가 섞인 글을 검색 가능하게 만들기",
            "seconds": 204,
            "video": true
          },
          {
            "id": "300949",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300772",
        "title": "데이터의 저장 타입을 결정하는 매핑(Mapping)매핑(mapping)이란? / 데이터 타입(data type)",
        "units": [
          {
            "id": "300808",
            "title": "매핑(mapping)이란? / 데이터 타입(data type)",
            "seconds": 330,
            "video": true
          },
          {
            "id": "300809",
            "title": "매핑(mapping)의 특이한 특징 (null 허용, Array 허용)",
            "seconds": 159,
            "video": true
          },
          {
            "id": "300810",
            "title": "[실습] 저장할 데이터에 맞게 매핑 정의하기",
            "seconds": 411,
            "video": true
          },
          {
            "id": "300948",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300773",
        "title": "자주 사용하는 검색 기능",
        "units": [
          {
            "id": "300811",
            "title": "검색 키워드가 포함된 데이터를 조회하고 싶을 때 (match)",
            "seconds": 191,
            "video": true
          },
          {
            "id": "300812",
            "title": "특정 값과 정확하게 일치하는 데이터를 조회하고 싶을 때 (term, terms)",
            "seconds": 453,
            "video": true
          },
          {
            "id": "300813",
            "title": "2가지 이상의 조건을 만족시키는 데이터를 조회하고 싶을 때 (bool : filter, must)",
            "seconds": 466,
            "video": true
          },
          {
            "id": "300814",
            "title": "[예제] filter와 must 구분해서 사용하기",
            "seconds": 378,
            "video": true
          },
          {
            "id": "300815",
            "title": "특정 조건을 만족하지 않는 데이터를 조회하고 싶을 때 (bool : must_not)",
            "seconds": 345,
            "video": true
          },
          {
            "id": "300816",
            "title": "숫자/날짜의 값에 대해 범위 조건으로 데이터를 조회하고 싶을 때 (range)",
            "seconds": 294,
            "video": true
          },
          {
            "id": "300817",
            "title": "특정 조건을 만족하는 데이터 위주로 상위 노출 시키고 싶을 때 (bool : should)",
            "seconds": 282,
            "video": true
          },
          {
            "id": "300818",
            "title": "[실습] 검색 결과 중 평점이 높고 좋아요 수가 많은 글을 상위에 노출시키고 싶은 경우",
            "seconds": 469,
            "video": true
          },
          {
            "id": "300819",
            "title": "오타가 있더라도 유사한 단어를 포함한 데이터를 조회하고 싶을 때 (fuzziness)",
            "seconds": 192,
            "video": true
          },
          {
            "id": "300820",
            "title": "여러 필드(ex. 제목, 내용)에서 검색 키워드가 포함된 데이터를 조회하고 싶을 때 (multi_match)",
            "seconds": 472,
            "video": true
          },
          {
            "id": "300821",
            "title": "검색한 키워드를 하이라이팅 처리하고 싶을 때 (highlight)",
            "seconds": 192,
            "video": true
          },
          {
            "id": "300822",
            "title": "페이지네이션 (Pagination), 정렬(Sorting)",
            "seconds": 217,
            "video": true
          },
          {
            "id": "300823",
            "title": "하나의 필드에 text와 keyword 타입을 동시에 사용하고 싶을 때 (Multi Field)",
            "seconds": 536,
            "video": true
          },
          {
            "id": "300824",
            "title": "검색 키워드를 일부 입력했을 때 검색어를 추천해주는 기능 (자동 완성 기능)",
            "seconds": 734,
            "video": true
          },
          {
            "id": "300953",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300774",
        "title": "[프로젝트] Elasticsearch로 쿠팡의 상품 검색 기능 구현하기",
        "units": [
          {
            "id": "300825",
            "title": "프로젝트 설명 / 요구 사항 (상품 검색 기능, 자동 완성 기능)",
            "seconds": 128,
            "video": true
          },
          {
            "id": "300826",
            "title": "기존 프로젝트 구조 살펴보기",
            "seconds": 257,
            "video": true
          },
          {
            "id": "300827",
            "title": "인프라 아키텍처 설계하기",
            "seconds": 236,
            "video": true
          },
          {
            "id": "300828",
            "title": "[실습] 인덱스 생성 / 매핑 정의 / 여러 필드에 걸쳐 검색하기",
            "seconds": 600,
            "video": true
          },
          {
            "id": "300829",
            "title": "[실습] 대소문자 구분 없이 검색 / 단어 순서 상관없이 검색 / HTML 태그 섞이지 않게 검색",
            "seconds": 522,
            "video": true
          },
          {
            "id": "300830",
            "title": "[실습] 한글, 영어 검색 / 동의어 기반 검색 / 필터링",
            "seconds": 794,
            "video": true
          },
          {
            "id": "300831",
            "title": "[실습] 특정 조건 상위 노출 / 오타 허용 검색 / 하이라이팅 처리 / 페이지네이션",
            "seconds": 288,
            "video": true
          },
          {
            "id": "300832",
            "title": "[실습] 자동 완성 기능",
            "seconds": 372,
            "video": true
          },
          {
            "id": "300833",
            "title": "최종 쿼리 / 적용 전략 및 순서",
            "seconds": 75,
            "video": true
          },
          {
            "id": "300834",
            "title": "[실습] Spring Boot에서 인덱스에 맞게 Document 정의하기",
            "seconds": 755,
            "video": true
          },
          {
            "id": "300835",
            "title": "[실습] MySQL에 데이터 삽입/삭제 시 Elasticsearch에도 같이 반영되게 만들기",
            "seconds": 430,
            "video": true
          },
          {
            "id": "300836",
            "title": "[실습] Spring Boot에서 Elasticsearch 활용해 자동완성 API 만들기",
            "seconds": 799,
            "video": true
          },
          {
            "id": "300837",
            "title": "[실습] Spring Boot에서 Elasticsearch 활용해 검색 API 만들기",
            "seconds": 1358,
            "video": true
          },
          {
            "id": "300838",
            "title": "[참고 자료] 프로젝트 완성본 (Github)",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300954",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300775",
        "title": "Elastic Cloud를 활용해 현업처럼 Elasticsearch 구축해보기",
        "units": [
          {
            "id": "300839",
            "title": "현업에서는 Elasticsearch를 직접 구축해서 쓰진 않나요?",
            "seconds": 66,
            "video": true
          },
          {
            "id": "300840",
            "title": "AWS Opensearch vs Elastic Cloud",
            "seconds": 196,
            "video": true
          },
          {
            "id": "313416",
            "title": "[보충 자료] Opensearch의 nori 플러그인 제공",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300841",
            "title": "[참고 자료] 실습에서 발생하는 Elastic Cloud 비용",
            "seconds": 0,
            "video": false
          },
          {
            "id": "300842",
            "title": "[실습] Elastic Cloud에서 Elasticsearch 생성하기 (+ 가입하기)",
            "seconds": 283,
            "video": true
          },
          {
            "id": "300843",
            "title": "[실습] Spring Boot에 Elasitc Cloud의 Elasticsearch 연결하기",
            "seconds": 343,
            "video": true
          },
          {
            "id": "300844",
            "title": "[보충 강의] 비용 나가지 않게 Elastic Cloud 리소스 정리하기",
            "seconds": 115,
            "video": true
          },
          {
            "id": "300955",
            "title": "섹션 9 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "300776",
        "title": "마무리",
        "units": [
          {
            "id": "300845",
            "title": "이 다음에는 어떤 걸 공부해야 하나요?",
            "seconds": 96,
            "video": true
          },
          {
            "id": "300846",
            "title": "완강을 축하드립니다!! 🎉🎉🎉",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "9": {
    "title": "[4주 완성] 시니어로 도약을 위한 클린 아키텍처 with AI",
    "url": "https://www.inflearn.com/course/4%EC%A3%BC-%EC%99%84%EC%84%B1-%ED%81%B4%EB%A6%B0-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-with-a",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-02-08 15:59:46",
    "totalSeconds": 3921,
    "totalUnits": 11,
    "sections": [
      {
        "id": "360884",
        "title": "1주차: 설계자의 마인드셋과 핵심 가치",
        "units": [
          {
            "id": "360968",
            "title": "AI 시대, 아키텍처의 중요성",
            "seconds": 411,
            "video": true
          },
          {
            "id": "360885",
            "title": "잘못된 코드의 비용: 설계와 아키텍처의 존재 이유",
            "seconds": 373,
            "video": true
          },
          {
            "id": "361006",
            "title": "AI Agent 프롬프트 엔지니어링과 코드 리뷰",
            "seconds": 419,
            "video": true
          },
          {
            "id": "361280",
            "title": "클린 아키텍처를 적용할 프로젝트 계획 작성하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361029",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "360976",
        "title": "2주차: 설계의 기준점, SOLID 원칙",
        "units": [
          {
            "id": "360969",
            "title": "프로그래밍 패러다임 3가지",
            "seconds": 544,
            "video": true
          },
          {
            "id": "360970",
            "title": "SOLID 원칙 - 유연한 설계를 위한 5가지 핵심 지침",
            "seconds": 607,
            "video": true
          },
          {
            "id": "361281",
            "title": "사용중인 언어/프레임워크에 SOLID 원칙을 적용해보기",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "360977",
        "title": "3주차: 클린 아키텍처",
        "units": [
          {
            "id": "361430",
            "title": "컴포넌트 원칙: 대규모 설계를 위한 모듈화",
            "seconds": 565,
            "video": true
          },
          {
            "id": "360971",
            "title": "클린 아키텍처",
            "seconds": 488,
            "video": true
          },
          {
            "id": "361636",
            "title": "사용중인 언어/프레임워크에 컴포넌트 & 클린 아키텍처 원칙 적용해보기",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "360978",
        "title": "4주차: 요약 & 실전 적용 (with AI)",
        "units": [
          {
            "id": "360972",
            "title": "요약: SOLID, 컴포넌트, 클린아키텍처의 관계",
            "seconds": 514,
            "video": true
          },
          {
            "id": "360974",
            "title": "AI Agent 활용: 프롬프트 엔지니어링 및 코드 리뷰",
            "seconds": 0,
            "video": false
          },
          {
            "id": "361639",
            "title": "[파이널 프로젝트] 클린 아키텍처 원칙을 적용한 프로젝트 공유하기",
            "seconds": 0,
            "video": false
          },
          {
            "id": "360973",
            "title": "강의를 마무리하며",
            "seconds": 0,
            "video": false
          },
          {
            "id": "411276",
            "title": "📖 필기할 필요없는, 강의 자료 모음 ZIP",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "35": {
    "title": "[Lv1] 면접에서 설명할 수 있는 Spring Boot - 경험으로 답변하는 백엔드 개발",
    "url": "https://www.inflearn.com/course/lv1-%EB%A9%B4%EC%A0%91%EC%97%90%EC%84%9C-x27%EC%84%A4%EB%AA%85%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-04-21 08:22:29",
    "totalSeconds": 35929,
    "totalUnits": 42,
    "sections": [
      {
        "id": "366768",
        "title": "[1교시] 웹 백엔드의 기초 - 인터넷부터 JSON까지",
        "units": [
          {
            "id": "366769",
            "title": "수업 교재 링크",
            "seconds": 0,
            "video": false
          },
          {
            "id": "386170",
            "title": "0. 인트로",
            "seconds": 199,
            "video": true
          },
          {
            "id": "383645",
            "title": "1-0. 🎯 오리엔테이션: 6교시 후 나는 무엇을 할 수 있나?",
            "seconds": 336,
            "video": true
          },
          {
            "id": "383648",
            "title": "1-1. 🌐 인터넷과 웹의 차이: 카톡과 유튜브의 공통점은?",
            "seconds": 919,
            "video": true
          },
          {
            "id": "383649",
            "title": "1-2.  🍽️ 클라이언트와 서버: 손님과 식당의 대화법",
            "seconds": 838,
            "video": true
          },
          {
            "id": "383650",
            "title": "1-3. 📨 HTTP란 무엇인가?: 전 세계가 쓰는 공통 언어",
            "seconds": 844,
            "video": true
          },
          {
            "id": "383651",
            "title": "1-4. 📦 JSON이란 무엇인가?: 데이터를 담는 표준 그릇",
            "seconds": 612,
            "video": true
          },
          {
            "id": "384320",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "383652",
        "title": "[2교시] 내 첫 번째 웹 서버 - Hello World부터 API까지",
        "units": [
          {
            "id": "383655",
            "title": "2-1. 🚀 내 첫 웹 서버 띄워보기: 순수 자바의 끔찍한 고통 체험",
            "seconds": 1341,
            "video": true
          },
          {
            "id": "383656",
            "title": "2-2. 🌱 Spring Boot 프로젝트 생성: 인스턴트 라면처럼 3초 만에",
            "seconds": 636,
            "video": true
          },
          {
            "id": "383657",
            "title": "2-3. 🎯 Hello World API 만들기: 7줄 코드로 서버 완성",
            "seconds": 665,
            "video": true
          },
          {
            "id": "383658",
            "title": "2-4. 📤 JSON 응답 만들기: 자바 객체가 JSON으로 변신하는 마법",
            "seconds": 485,
            "video": true
          },
          {
            "id": "383660",
            "title": "2-5. 🎯 경로 변수로 동적 요청 받기: 하나의 메서드로 수억 개 처리",
            "seconds": 290,
            "video": true
          },
          {
            "id": "384318",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "383661",
        "title": "[3교시] 데이터베이스 연결 - 메모리부터 JPA까지",
        "units": [
          {
            "id": "383663",
            "title": "3-1. 💾 메모리에 데이터 저장하기: HashMap의 치명적인 한계",
            "seconds": 734,
            "video": true
          },
          {
            "id": "383664",
            "title": "3-2. 🗄️ 데이터베이스 개념: 영구 보관 냉장고 설치하기",
            "seconds": 884,
            "video": true
          },
          {
            "id": "383665",
            "title": "3-3. 😭 JdbcTemplate으로 DB 저장하기: SQL 문자열 지옥 체험",
            "seconds": 1373,
            "video": true
          },
          {
            "id": "383667",
            "title": "3-4. ✨ JPA로 DB 저장: SQL 없이 save() 한 줄로 끝",
            "seconds": 944,
            "video": true
          },
          {
            "id": "383669",
            "title": "3-5. 🎮 Repository 만들기: 코드 안 짜도 작동하는 제어판",
            "seconds": 1007,
            "video": true
          },
          {
            "id": "384319",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "383670",
        "title": "[4교시] 스프링의 마법 해부 - 프록시부터 DI까지",
        "units": [
          {
            "id": "383673",
            "title": "4-1. 🎭 마법의 정체: 프록시(Proxy)란 무엇인가",
            "seconds": 614,
            "video": true
          },
          {
            "id": "383674",
            "title": "4-2. 🔨 [실습] 수동으로 매니저 고용하기: 정적 프록시",
            "seconds": 614,
            "video": true
          },
          {
            "id": "383676",
            "title": "4-3. 🏭 [실습] 자동 프록시: 매니저를 찍어내는 공장",
            "seconds": 1383,
            "video": true
          },
          {
            "id": "383678",
            "title": "4-4.  📦 거대한 부품 창고: ApplicationContext와 스프링 빈",
            "seconds": 1679,
            "video": true
          },
          {
            "id": "383679",
            "title": "4-5. ♻️ 싱글톤의 비밀: 왜 창고에서 꺼내 쓸까?",
            "seconds": 820,
            "video": true
          },
          {
            "id": "383681",
            "title": "4-6. 🚀 의존성 주입(DI): 배달의 민족",
            "seconds": 1288,
            "video": true
          },
          {
            "id": "383682",
            "title": "4-7. 👨‍🍳 키오스크 뒤의 요리사: SimpleJpaRepository 해부",
            "seconds": 982,
            "video": true
          },
          {
            "id": "383684",
            "title": "4-8. 🔍 쿼리 생성기: findByEmail의 비밀",
            "seconds": 862,
            "video": true
          },
          {
            "id": "383685",
            "title": "4-9. 🗺️ 최종 정리: 스캔부터 실행까지 전체 지도",
            "seconds": 525,
            "video": true
          }
        ]
      },
      {
        "id": "383688",
        "title": "[5교시] 계층 분리와 트랜잭션 - 안전한 백엔드의 완성",
        "units": [
          {
            "id": "383689",
            "title": "5-1. 🏗️ 3계층 아키텍처: 점원-매니저-냉장고 역할 분리의 기술",
            "seconds": 1690,
            "video": true
          },
          {
            "id": "383691",
            "title": "5-2. 💡 [심화] 귀찮은데 왜 나눠요? 계층 분리의 이유",
            "seconds": 559,
            "video": true
          },
          {
            "id": "383692",
            "title": "5-3. 🛡️ 트랜잭션: 다 주거나, 아예 말거나 (개념)",
            "seconds": 464,
            "video": true
          },
          {
            "id": "383694",
            "title": "5-4. ✅ @Transactional: 스티커 한 장의 기적 (실습)",
            "seconds": 834,
            "video": true
          },
          {
            "id": "383695",
            "title": "5-5. 🕵️ 범인을 찾아라: @Transactional의 작동 원리",
            "seconds": 653,
            "video": true
          },
          {
            "id": "393331",
            "title": "5-6. 🛠️ DIY: 나만의 '가짜(Proxy)' 만들기 (시간 측정 AOP)",
            "seconds": 950,
            "video": true
          }
        ]
      },
      {
        "id": "383686",
        "title": "[6교시] 프로처럼 완성하기 - 예외처리부터 실전 프로젝트까지",
        "units": [
          {
            "id": "383697",
            "title": "6-1. 🚨 예외처리: 500 에러를 404와 400으로 바꾸는 법",
            "seconds": 1122,
            "video": true
          },
          {
            "id": "383698",
            "title": "6-2. 🛡️ 전역 예외 처리: 레스토랑 지배인이 모든 소란 해결하기",
            "seconds": 1514,
            "video": true
          },
          {
            "id": "383699",
            "title": "6-3. 👮 검증 (Validation): 쓰레기 데이터를 입구에서 차단하는 문지기",
            "seconds": 775,
            "video": true
          },
          {
            "id": "383701",
            "title": "6-4. ✅ @Valid 사용: DTO로 Entity 보호하고 자동 검증하기",
            "seconds": 1249,
            "video": true
          },
          {
            "id": "383702",
            "title": "6-5. 📝 로깅 (Logging): System.out.println 버리고 프로 로그북 쓰기",
            "seconds": 954,
            "video": true
          },
          {
            "id": "383703",
            "title": "6-6. 📄 페이징 (Paging): findAll() 금지, 100만 건도 안전하게",
            "seconds": 1226,
            "video": true
          },
          {
            "id": "383705",
            "title": "6-7. 🎯 실전 프로젝트 Part 1: User-Todo 관계 설계와 Repository 구축",
            "seconds": 982,
            "video": true
          },
          {
            "id": "383706",
            "title": "6-8. 🚀 실전 프로젝트 Part 2: 소유권 검증과 더티 체킹으로 완벽한 CRUD 완성",
            "seconds": 1495,
            "video": true
          },
          {
            "id": "383708",
            "title": "6-9. 🎓 수료: 여러분, 정말 수고하셨습니다",
            "seconds": 588,
            "video": true
          },
          {
            "id": "384296",
            "title": "🎁 EVENT🎁 수강평 인증하는 방법",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ]
  },
  "extra-342699": {
    "title": "실리콘 밸리 개발자와 함께하는 실전 AI 에이전트 핵심 원리 및 확장 개발",
    "url": "https://www.inflearn.com/course/up-to-1500-usd-credi",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-08-23 15:59:29",
    "totalSeconds": 25040,
    "totalUnits": 36,
    "sections": [
      {
        "id": "463226",
        "title": "강의 소개 및 에이전트란 무엇이고, 무엇을 만들 것인가",
        "units": [
          {
            "id": "463227",
            "title": "이 강의를 통해 어떤것을 배우고 학습할까요?",
            "seconds": 456,
            "video": true
          },
          {
            "id": "483544",
            "title": "[협업] Moonshot Kimi K3 Model",
            "seconds": 0,
            "video": false
          },
          {
            "id": "464953",
            "title": "AI 에이전트란 무엇이고, 흔히 말하는 에이전트 루프란 무엇일까",
            "seconds": 656,
            "video": true
          },
          {
            "id": "464954",
            "title": "우리는 이 강의에서 어떤 개념을 학습하게 될까",
            "seconds": 612,
            "video": true
          },
          {
            "id": "464955",
            "title": "개발 환경 준비와 Ollama 도구·모델 준비하기",
            "seconds": 625,
            "video": true
          },
          {
            "id": "483578",
            "title": "섹션 1 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464978",
        "title": "손으로 만드는 에이전트",
        "units": [
          {
            "id": "464956",
            "title": "message 배열은 무엇을 의미하고, 함수 호출이란 무엇일까",
            "seconds": 754,
            "video": true
          },
          {
            "id": "464957",
            "title": "tools 파라미터 정의 및 실행하고 결과 확인해보기",
            "seconds": 1072,
            "video": true
          },
          {
            "id": "464958",
            "title": "에이전트 루프 흐름 짜보며 사용하는 도구 늘려보기",
            "seconds": 935,
            "video": true
          },
          {
            "id": "464959",
            "title": "다단계 추론 관찰 및 무한 루프와 정지 조건 (중간 정리)",
            "seconds": 674,
            "video": true
          },
          {
            "id": "483577",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464979",
        "title": "Vercel AI SDK로 다시 마이그레이션",
        "units": [
          {
            "id": "464960",
            "title": "Vercel AI SDK 소개와 Ollama에 SDK 연동하기",
            "seconds": 799,
            "video": true
          },
          {
            "id": "464961",
            "title": "generateText 호출 및 도구 정의와 zod 스키마",
            "seconds": 737,
            "video": true
          },
          {
            "id": "464962",
            "title": "steps 개념과 응답 스트리밍 및 멀티스텝 패턴",
            "seconds": 956,
            "video": true
          },
          {
            "id": "483581",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464980",
        "title": "로컬 업무 에이전트 — 도구 통합",
        "units": [
          {
            "id": "464963",
            "title": "스키마 설계 원칙과 workspace 개념 고려하기",
            "seconds": 656,
            "video": true
          },
          {
            "id": "464964",
            "title": "파일 쓰기·생성 그리고 목록과 검색까지",
            "seconds": 767,
            "video": true
          },
          {
            "id": "464965",
            "title": "웹 페이지 fetch 방법과 컨텍스트를 아끼는 패턴",
            "seconds": 813,
            "video": true
          },
          {
            "id": "464966",
            "title": "여러 도구를 사용하는 실전 시나리오와 정리",
            "seconds": 591,
            "video": true
          },
          {
            "id": "483579",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464952",
        "title": "에이전트 메모리",
        "units": [
          {
            "id": "464967",
            "title": "메모리는 왜 필요하고 대화가 길어짐에 따른 컨텍스트 한계",
            "seconds": 1028,
            "video": true
          },
          {
            "id": "464968",
            "title": "오래된 맥락 관리 및 장기 메모리 설계",
            "seconds": 742,
            "video": true
          },
          {
            "id": "464969",
            "title": "사실 회상 도구와, 사실을 기억하는 에이전트 시연하기",
            "seconds": 790,
            "video": true
          },
          {
            "id": "483576",
            "title": "섹션 5 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464982",
        "title": "견고함과 제어",
        "units": [
          {
            "id": "464971",
            "title": "왜 우리 에이전트는 종종 멍청해질까",
            "seconds": 560,
            "video": true
          },
          {
            "id": "464972",
            "title": "도구 제어와 에러 처리 그리고 에러 회복성까지",
            "seconds": 736,
            "video": true
          },
          {
            "id": "464973",
            "title": "프롬프트를 활용한 행동 규율 적용과 승인 패턴",
            "seconds": 743,
            "video": true
          },
          {
            "id": "464974",
            "title": "디버깅과 메시지 확인 그리고 실패 패턴들 알아두기",
            "seconds": 620,
            "video": true
          },
          {
            "id": "483580",
            "title": "섹션 6 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "464970",
        "title": "캡스톤 — 완성형 로컬 업무 에이전트",
        "units": [
          {
            "id": "464975",
            "title": "캡스톤 설계와 중간 정리하기",
            "seconds": 513,
            "video": true
          },
          {
            "id": "464976",
            "title": "스트리밍 다듬기와 멀티스텝 End-to-End 시연",
            "seconds": 336,
            "video": true
          },
          {
            "id": "464977",
            "title": "우리가 다루지 않은 것들과 추가로 알아야 하는 것들, 그리고 마무리까지",
            "seconds": 439,
            "video": true
          },
          {
            "id": "483583",
            "title": "섹션 7 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "482043",
        "title": "[협업, 선착순 Credit 제공!] 2.8조 파라미터와 100만 토큰 컨텍스트를 지원하는 K3",
        "units": [
          {
            "id": "483566",
            "title": "[선착순!!! 최대 15000 USD] Credit 요청 방법",
            "seconds": 0,
            "video": false
          },
          {
            "id": "482044",
            "title": "K3 공식 블로그 해석하며 모델의 특징과 한계에 대해 현실적으로 해석하기",
            "seconds": 1941,
            "video": true
          },
          {
            "id": "482045",
            "title": "우리 에이전트를 Kimi로 한번 돌려보기",
            "seconds": 824,
            "video": true
          },
          {
            "id": "482046",
            "title": "Kimi K3를 활용하여 실제 업무 워크플로우 돌리기",
            "seconds": 797,
            "video": true
          },
          {
            "id": "482047",
            "title": "Kimi Code의 CLI 코딩 워크플로우와 Agent를 활용한 이미지 OCR",
            "seconds": 554,
            "video": true
          },
          {
            "id": "482048",
            "title": "이미지 자료를 기반으로 하는 버그 잡기",
            "seconds": 610,
            "video": true
          },
          {
            "id": "482049",
            "title": "K3의 거대한 컨텍스트를 기반으로 하는 긴 코드와 문서 통째로 다루기",
            "seconds": 696,
            "video": true
          },
          {
            "id": "482050",
            "title": "Claude & Codex와의 차이 그리고 비용 관점까지",
            "seconds": 654,
            "video": true
          },
          {
            "id": "482051",
            "title": "K3의 거대한 컨텍스트를 활용하는 Agent Swarm 수백 개를 병렬로",
            "seconds": 794,
            "video": true
          },
          {
            "id": "482052",
            "title": "현실적인 가격·도입과 장단점, 언제 쓰면 좋을까?",
            "seconds": 560,
            "video": true
          },
          {
            "id": "483582",
            "title": "섹션 8 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ],
    "inflearnId": 342699,
    "dashboardUrl": "https://demo-sub.inflearn.com/course/up-to-1500-usd-credi/dashboard?cid=342699"
  },
  "extra-340328": {
    "title": "개발자 기술면접 완벽 가이드 : 면접관 100회의 합격 프레임",
    "url": "https://www.inflearn.com/course/the-ultimate-guide-t",
    "checkedOn": "2026-09-06",
    "updatedAt": "2026-06-02 18:45:51",
    "totalSeconds": 18398,
    "totalUnits": 20,
    "sections": [
      {
        "id": "406812",
        "title": "기술면접의 본질과 합격 프레임",
        "units": [
          {
            "id": "406813",
            "title": "기술면접에서 사람들이 실제로 떨어지는 이유",
            "seconds": 536,
            "video": true
          },
          {
            "id": "406814",
            "title": "기술면접 합격의 2가지 축",
            "seconds": 1001,
            "video": true
          }
        ]
      },
      {
        "id": "447065",
        "title": "답변의 퀄리티를 만드는 기본기",
        "units": [
          {
            "id": "447066",
            "title": "기술면접 질문의 기본 패턴 이해하기",
            "seconds": 654,
            "video": true
          },
          {
            "id": "447067",
            "title": "가장 먼저 대비해야 할 질문들",
            "seconds": 433,
            "video": true
          },
          {
            "id": "447069",
            "title": "개발자H의 실제 이력서 예시",
            "seconds": 422,
            "video": true
          },
          {
            "id": "447068",
            "title": "꼬리질문에 대응하는 가장 완벽한 방법 - part1",
            "seconds": 555,
            "video": true
          },
          {
            "id": "447070",
            "title": "꼬리질문에 대응하는 가장 완벽한 방법 - part2",
            "seconds": 655,
            "video": true
          },
          {
            "id": "447071",
            "title": "면접관 귀에 박히는 답변 구조 만들기 - part1",
            "seconds": 622,
            "video": true
          },
          {
            "id": "447072",
            "title": "면접관 귀에 박히는 답변 구조 만들기 - part2",
            "seconds": 640,
            "video": true
          },
          {
            "id": "454670",
            "title": "섹션 2 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "447073",
        "title": "같은 답변도 다르게 보이게 만드는 전달력",
        "units": [
          {
            "id": "447074",
            "title": "면접관이 함께 일하고 싶은 이미지",
            "seconds": 1459,
            "video": true
          },
          {
            "id": "447075",
            "title": "단기간에 면접실력 200% 높이는 3-way 시스템",
            "seconds": 764,
            "video": true
          },
          {
            "id": "447076",
            "title": "방구석에서 면접실력 키우는 방법",
            "seconds": 1074,
            "video": true
          },
          {
            "id": "447077",
            "title": "모의면접 제대로하는 방법",
            "seconds": 1243,
            "video": true
          },
          {
            "id": "447078",
            "title": "실전 면접 200% 활용 방법",
            "seconds": 866,
            "video": true
          },
          {
            "id": "454669",
            "title": "섹션 3 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      },
      {
        "id": "447079",
        "title": "개발자 면접 완전 해부 (실전 대응 편)",
        "units": [
          {
            "id": "447080",
            "title": "개발자 면접 전체 흐름 한 번에 보기",
            "seconds": 482,
            "video": true
          },
          {
            "id": "447081",
            "title": "자기소개 파트 해부",
            "seconds": 1172,
            "video": true
          },
          {
            "id": "447082",
            "title": "필수 기본 검증 파트 해부",
            "seconds": 1415,
            "video": true
          },
          {
            "id": "447083",
            "title": "진정성 검증 파트 해부",
            "seconds": 1327,
            "video": true
          },
          {
            "id": "447084",
            "title": "적합도 검증 파트 해부",
            "seconds": 1437,
            "video": true
          },
          {
            "id": "447085",
            "title": "협상 파트 해부",
            "seconds": 1641,
            "video": true
          },
          {
            "id": "454671",
            "title": "섹션 4 퀴즈",
            "seconds": 0,
            "video": false
          }
        ]
      }
    ],
    "inflearnId": 340328,
    "dashboardUrl": "https://demo-sub.inflearn.com/course/the-ultimate-guide-t/dashboard?cid=340328"
  }
};
