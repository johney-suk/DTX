export enum Hospital {
    Seoul = '01',
    Busan = '02',
    Andong = '03',
    Serverance = '04',
  }
  
  // 병원 옵션 리스트 (UI에서 병원명 표시)
  export const hospitalOptions = [
    { code: Hospital.Seoul, name: '서울대병원' },
    { code: Hospital.Busan, name: '부산대병원' },
    { code: Hospital.Andong, name: '안동병원' },
    { code: Hospital.Serverance, name: '세브란스병원' },
  ];
  
  // 병원 코드에 맞는 이메일 도메인 매핑
  export const hospitalEmailFormats: Record<Hospital, string> = {
    [Hospital.Seoul]: '@seoulhospital.com',
    [Hospital.Busan]: '@busanhospital.com',
    [Hospital.Andong]: '@andonghospital.com',
    [Hospital.Serverance]: '@ulsanhospital.com',
  };