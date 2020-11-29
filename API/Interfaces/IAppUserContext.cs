using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAppUserContext: IDisposable
    {
        DbSet<AppUser> Users { get; }

    

    }
}
