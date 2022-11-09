'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Mandy',
          lastName: 'Pyford',
          email: 'mpyford0@xinhuanet.com',
          password:
            '$2a$10$nzqf8fG92KIdewjWgnnFS.flgcFOeKBSbn2BZHlBFHm6bgLXdsfzq',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Tessy',
          lastName: 'Hutchinges',
          email: 'thutchinges1@archive.org',
          password:
            '$2a$10$ofDkNH99Fck0HoAux6W3i.yanyanufJUbUBKdVb0Tw0uhgFtUUTEu',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Sharron',
          lastName: 'De Haven',
          email: 'sdehaven2@phoca.cz',
          password:
            '$2a$10$X/apSS6WwbdaPzKj8XSWoepzOihccYxJBS5rkMU9SGGazPVY9zB6.',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Wanda',
          lastName: 'Grushin',
          email: 'wgrushin3@reuters.com',
          password:
            '$2a$10$O7vgYXuH3lbfeGeVG5yNbeYW3/0XIO1o7PbbFWaz2xuKE.UwRJkFu',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Janice',
          lastName: 'Tankard',
          email: 'jtankard4@vinaora.com',
          password:
            '$2a$10$0EhmEIRSXh.ThxCKeyxicOAORkg.rjiwGdsyAZGY.V9/wFqkqhcRe',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Iosep',
          lastName: 'Peasey',
          email: 'ipeasey0@creativecommons.org',
          password:
            '$2a$10$3yctwSN.g/4SOe.tvxHVf.iaviYtns08EUunZkRuFG3Ozop8WDkxW',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Nancey',
          lastName: 'Garstan',
          email: 'ngarstan1@devhub.com',
          password:
            '$2a$10$RF7Lxkidl6.AMahFzgWDnO087uWfocilm3Ryz/HbcvZMh9mAoG2cC',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Anna',
          lastName: 'Templeman',
          email: 'atempleman2@japanpost.jp',
          password:
            '$2a$10$xpWWqxz2sSgYPpGF4npFpefHWWMLpy.WZBX876xWNv3b0jJ4H0GCe',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Amber',
          lastName: 'Altoft',
          email: 'aaltoft3@redcross.org',
          password:
            '$2a$10$d7LBqg8gSKM/8hu5dUCYo.Ly3WUdCTIKOAfHVIHr7LAVeSuCS/cLC',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Nefen',
          lastName: 'Muslim',
          email: 'nmuslim4@cam.ac.uk',
          password:
            '$2a$10$McneERv0ccaQhutRshoMDuddTFnXHt5foFOYlsOEXYHWuecc6WMcu',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Germayne',
          lastName: 'Clarycott',
          email: 'gclarycott5@reference.com',
          password:
            '$2a$10$9hCynDo9c5GVyYjZoZqM3Osi8VlCWADXcglkGfH9YmswBv48ga0RG',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Avie',
          lastName: 'Lowrey',
          email: 'alowrey6@phpbb.com',
          password:
            '$2a$10$1bKvoacjK478yTAOngIdWu7A0X9M36zvcGpyxXZgxDkS7boBI.NVO',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Mozes',
          lastName: 'Top',
          email: 'mtop7@soup.io',
          password:
            '$2a$10$45X110LuHnpjbil8P2mjH.nyJrIBMlvT1b12jKrsKDvNldSzArdQy',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Tybie',
          lastName: 'Rennebach',
          email: 'trennebach8@bloomberg.com',
          password:
            '$2a$10$B/96CzKOB4mVIRTDGe.dyu8iuiRvLSspaI8uotElGhulmfLglSGB2',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Myrna',
          lastName: 'Follos',
          email: 'mfollos9@sogou.com',
          password:
            '$2a$10$TDAdkOfmaaiJWQHnERsFnOyyYz415buA84a5Q.xaPZ9qfxuuYig0W',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Inna',
          lastName: 'Noen',
          email: 'inoena@umich.edu',
          password:
            '$2a$10$Ll5Ay.dP4RVVzxC.AbQbFO68.aFxbifhfSe63T6y9OLYhVVZvGMPe',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Lloyd',
          lastName: 'Germain',
          email: 'lgermainb@nbcnews.com',
          password:
            '$2a$10$D1bXJ3rIU9b.CeSUJ0WZdOnCTN/kFvwb1DgQX8.LlbrZmTOh3jwTm',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Justine',
          lastName: 'Segoe',
          email: 'jsegoec@ftc.gov',
          password:
            '$2a$10$c/uisMWJhko8v2SxaY0X.eXmwA7DqqOejzGemyD/NTTVOaSlcEmiy',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Miriam',
          lastName: 'Itzkovwitch',
          email: 'mitzkovwitchd@shareasale.com',
          password:
            '$2a$10$PZ6k/kPhXNj5Tc3QstvSXOLGeQxxgo5vxTd4GTvrMRO9PHbVdrr.y',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Cordey',
          lastName: 'Disman',
          email: 'cdismane@kickstarter.com',
          password:
            '$2a$10$cq2U9Fq4sBMUuU4InW.w/epcxeroYN8H.J0n1UY5iV.P5phxfaisO',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
