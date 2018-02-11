const debug = require('debug')('loopback:boot:roles');

debug.log = console.log.bind(console);

module.exports = async function(app)
{
  try
  {
    // used the models
    const {Role, RoleMapping, Member, DealerAddress, DealerContact, Oem, Brand, Center, MR, AdvertisingAgency, AutoGroup, AutoGroupContact, AgencyContact} = app.models;

    // create custom role Admin
    const AdminRole = await Role.findOne({where: {name: 'Admin'}});
    if (!AdminRole)
    {
      await Role.create({name: 'Admin', role_id : 1});
      debug('Created Admin role');
    }

    // create custom role Staff
    const orgStaffRole = await Role.findOne({where: {name: 'Artist'}});
    if (!orgStaffRole)
    {
      await Role.create({name: 'Artist', role_id : 2});
      debug('Created Staff role');
    }

    // create custom role Regional Manager
    const orgRegionalManager = await Role.findOne({where: {name: 'Salon'}});
    if (!orgRegionalManager)
    {
      await Role.create({name: 'Salon', role_id : 3});
      debug('Created Regional Manager role');
    }

// create custom role Account Manager
    


    // fix the mongo db object assignment
    const ObjectID = RoleMapping.getDataSource().connector.getDefaultIdType();

    // Because of this:
    // https://github.com/strongloop/loopback-connector-mongodb/issues/128
    RoleMapping.defineProperty('principalId', {
      type: ObjectID,
    });
    Member.defineProperty('oem', {
          type: ObjectID,
        });
    Member.defineProperty('mr', {
              type: ObjectID,
            });
    Member.defineProperty('center', {
              type: ObjectID,
            });
    Member.defineProperty('brand', {
              type: ObjectID,
            });
    DealerAddress.defineProperty('dealerId', {
          type: ObjectID,
        });
    DealerAddress.defineProperty('country', {
              type: ObjectID,
            });
    DealerAddress.defineProperty('province', {
              type: ObjectID,
            });
    DealerAddress.defineProperty('billcountry', {
              type: ObjectID,
            });
    DealerAddress.defineProperty('billprovince', {
              type: ObjectID,
            });
    DealerContact.defineProperty('dealerId', {
          type: ObjectID,
        });

    AutoGroupContact.defineProperty('autoGroupId', {
          type: ObjectID,
        });

    AgencyContact.defineProperty('advertisingAgencyId', {
          type: ObjectID,
        });
Brand.defineProperty('oemId', {
          type: ObjectID,
        });
Center.defineProperty('oemId', {
          type: ObjectID,
        });
Center.defineProperty('brandId', {
          type: ObjectID,
        });

MR.defineProperty('oemId', {
          type: ObjectID,
        });
MR.defineProperty('brandId', {
          type: ObjectID,
        });
MR.defineProperty('centerId', {
          type: ObjectID,
        });


    // Helps to get the include relationship
    RoleMapping.belongsTo(Member);
    Member.hasMany(RoleMapping, {foreignKey: 'principalId'});
    Role.hasMany(Member, {through: RoleMapping, foreignKey: 'roleId'});
  }
  catch (roleCreationErr)
  {
    console.log(roleCreationErr);
    throw roleCreationErr;
  }
};
