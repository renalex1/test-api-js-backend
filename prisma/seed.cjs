const { PrismaClient, AuthMethod, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();
const { hash } = require('argon2');

const userInfo = {
  email: 'admin@test.com',
  password: '123456',
  fullName: 'admin',
  role: UserRole.ADMIN,
  isVerified: true,
  method: AuthMethod.CREDENTIALS
}

const contractsInfo = [
  { no: "12345", issueDate: new Date("2015-03-12") },
  { no: "67890", issueDate: new Date("2017-07-01") },
  { no: "11223", issueDate: new Date("2019-05-22") }
]
const contactsInfo = [
  { lastName: "Григорьев", firstName: "Сергей", patronymic: "Петрович", email: "grigoriev@funeral.com", phone: "+79162165588", },
  { lastName: "Иванов", firstName: "Алексей", patronymic: "Игоревич", email: "ivanov@example.com", phone: "+79231112233", },
  { lastName: "Смирнова", firstName: "Ольга", patronymic: "Андреевна", email: "smirnova@example.com", phone: "+79334445566", }
];

const photosInfo = [
  {
    name: "0b8fc462dcabf7610a91.png",
    filepath: "uploads/0b8fc462dcabf7610a91.png",
    thumbPath: "uploads/thumbnails/0b8fc462dcabf7610a91_160x160.png",
  }, {
    name: "0b8fc462dcabf7610a92.png",
    filepath: "uploads/0b8fc462dcabf7610a92.png",
    thumbPath: "uploads/thumbnails/0b8fc462dcabf7610a92_160x160.png",
  }, {
    name: "0b8fc462dcabf7610a93.png",
    filepath: "uploads/0b8fc462dcabf7610a93.png",
    thumbPath: "uploads/thumbnails/0b8fc462dcabf7610a93_160x160.png",
  },
]

const companyInfo = [
  { name: "ООО Фирма «Перспективные захоронения»", shortName: "Перспективные", businessEntity: "ООО Перспективные", type: ["agent", "contractor"], status: "active" },
  { name: "ООО Фирма «Новые горизонты»", shortName: "Горизонты", businessEntity: "ООО Горизонты", type: ["contractor"], status: "inactive" },
  { name: "ООО Фирма «ТехноСфера»", shortName: "ТехноСфера", businessEntity: "ООО ТехноСфера", type: ["agent"], status: "active" }
];


async function main() {
  userInfo.password = await hash(userInfo.password)

  let user = await prisma.user.findUnique({ where: { email: userInfo.email } })

  if (!user) {
    user = await prisma.user.create({
      data: userInfo
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: AuthMethod.CREDENTIALS,
        expiresAt: 10
      }
    });
  }

  for (let i = 0; i < companyInfo.length; i++) {
    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          { name: companyInfo[i].name },
          { businessEntity: companyInfo[i].businessEntity }
        ],
      }
    });

    if (!existingCompany) {
      const createdCompany = await prisma.company.create({
        data: {
          ...companyInfo[i],
          userId: user.id,
        }
      });

      await prisma.photo.create({
        data: {
          ...photosInfo[i],
          company: {
            connect: { id: createdCompany.id },
          }
        }
      });

      await prisma.contract.create({
        data: {
          ...contractsInfo[i],
          companies: {
            connect: { id: createdCompany.id },
          }
        }
      });

      await prisma.contact.create({
        data: {
          ...contactsInfo[i],
          companies: {
            connect: { id: createdCompany.id },
          }
        }
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
