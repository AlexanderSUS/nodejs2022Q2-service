import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkxvZ2luIDIiLCJ1c2VySWQiOiI2Y2EwMDczYS0xYmE1LTRlNjMtYWZlOS1lZGI3ODcwNjE3ZjAiLCJpYXQiOjE2ODcxMjEyNzQsImV4cCI6MTY4NzEyNDg3NH0.IsRTlLrdVMJqr4TYZwt7CQBpVTOf7JBTv0gsJ80S8Bc',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkxvZ2luIDIiLCJ1c2VySWQiOiI2Y2EwMDczYS0xYmE1LTRlNjMtYWZlOS1lZGI3ODcwNjE3ZjAiLCJpYXQiOjE2ODcxMjEyNzQsImV4cCI6MTY4NzIwNzY3NH0.JUU2-B8LVoaUAQKNYmfDwsh29zXZ_FfLgn5NU4pfY8I',
  })
  refreshToken: string;
}
