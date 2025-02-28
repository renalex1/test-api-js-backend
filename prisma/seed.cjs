const { PrismaClient, AuthMethod, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();
const { hash } = require('argon2');

async function main() {
  const users = await prisma.user.findMany();
  const contacts = await prisma.contact.findMany().length
  const companies = await prisma.company.findMany().length
  const photos = await prisma.photo.findMany().length
  const contracts = await prisma.contract.findMany().length

  if (!users.length) {
    const user = await prisma.user.create({
      data: {
        email: 'admin@test.com',
        password: await hash('123456'),
        fullName: 'admin',
        role: UserRole.ADMIN,
        isVerified: true,
        method: AuthMethod.CREDENTIALS
      }
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

  if (!contracts) {
    await prisma.contract.createMany({
      data: [
        { no: "12345", issueDate: new Date("2015-03-12") },
        { no: "67890", issueDate: new Date("2017-07-01") },
        { no: "11223", issueDate: new Date("2019-05-22") }
      ]
    });
  }

  const allContracts = await prisma.contract.findMany();

  if (!photos) {
    await prisma.photo.createMany({
      data: [
        {
          name: "0b8fc462dcabf7610a91.png",
          filepath: "0b8fc462dcabf7610a91.png",
          thumbpath: "0b8fc462dcabf7610a91_160x160.png",
        }, {
          name: "0b8fc462dcabf7610a91.png",
          filepath: "0b8fc462dcabf7610a91.png",
          thumbpath: "0b8fc462dcabf7610a91_160x160.png",
        }, {
          name: "0b8fc462dcabf7610a91.png",
          filepath: "0b8fc462dcabf7610a91.png",
          thumbpath: "0b8fc462dcabf7610a91_160x160.png",
        },
      ]
    });
  }

  const allPhotos = await prisma.photo.findMany();

  if (!companies) {
    const companiesData = [
      { name: "ООО Фирма «Перспективные захоронения»", shortName: "Перспективные", businessEntity: "ООО Перспективные", contractId: allContracts[0].id, type: ["agent", "contractor"], status: "active" },
      { name: "ООО Фирма «Новые горизонты»", shortName: "Горизонты", businessEntity: "ООО Горизонты", contractId: allContracts[1].id, type: ["contractor"], status: "inactive" },
      { name: "ООО Фирма «ТехноСфера»", shortName: "ТехноСфера", businessEntity: "ООО ТехноСфера", contractId: allContracts[2].id, type: ["agent"], status: "active" }
    ];

    for (const companyData of companiesData) {
      const existingCompany = await prisma.company.findUnique({
        where: { businessEntity: companyData.businessEntity }
      });

      if (!existingCompany) {
        await prisma.company.create({
          data: companyData
        });
      }
    }
  }

  const allCompanies = await prisma.company.findMany();


  if (!contacts) {
    const contactsData = [
      { lastName: "Григорьев", firstName: "Сергей", patronymic: "Петрович", email: "grigoriev@funeral.com", phone: "+79162165588", companyId: allCompanies[0].id },
      { lastName: "Иванов", firstName: "Алексей", patronymic: "Игоревич", email: "ivanov@example.com", phone: "+79231112233", companyId: allCompanies[1].id },
      { lastName: "Смирнова", firstName: "Ольга", patronymic: "Андреевна", email: "smirnova@example.com", phone: "+79334445566", companyId: allCompanies[2].id }
    ];
  
    const existingEmails = await prisma.contact.findMany({
      where: { email: { in: contactsData.map(c => c.email) } },
      select: { email: true }
    });
  
    const existingEmailSet = new Set(existingEmails.map(contact => contact.email));
  
    const newContacts = contactsData.filter(contact => !existingEmailSet.has(contact.email));
  
    if (newContacts.length > 0) {
      await prisma.contact.createMany({
        data: newContacts
      });
    }
  }

  const allContact = await prisma.contact.findMany();

  if (!contacts && !companies && !photos && !contracts)
    for (let i = 0; i < allCompanies.length; i++) {
      if (allPhotos[i]) {
        await prisma.photo.update({
          where: { id: allPhotos[i].id },
          data: { companyId: allCompanies[i].id }
        });
      }
      if (allContracts[i]) {
        await prisma.contract.update({
          where: { id: allContracts[i].id },
          data: { companyId: allCompanies[i].id }
        });
      }
      if (allContact[i]) {
        await prisma.company.update({
          where: { id: allCompanies[i].id },
          data: { contactId: allContact[i].id }
        });
      }
    }

}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
