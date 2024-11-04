package com.task.Repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.task.Model.User;

@Repository
public class UserRepository {

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    public String addUserInfo(String name, String password) {
        boolean checkInfo = checkCredentials(name, password);

        if (checkInfo) {
            return "User Already Exists";
        }
        try {
            Session session = sessionFactory.getCurrentSession();
            User user = new User(name, password);
            session.save(user);
            return "User \"" + user.getUserName() + "\" Created Successfully!!";
        } catch (HibernateException e) {
            System.out.println(e);
            return "Corrupted";
        }
    }

    @Transactional
    public List<User> getUsers() {
        Session session = sessionFactory.openSession();
        List<User> users = null;

        try {
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.gt("visitCount", 0));
            users = criteria.list();
        } catch (HibernateException e) {
            System.out.println(e);
        }
        return users;
    }

    @Transactional
    public String validateLogin(String name, String password) {
        Session session = sessionFactory.getCurrentSession();
        String message = "Invalid Credentials... Please check username or Password!!";

        try {
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("userName", name));
            criteria.add(Restrictions.eq("password", password));
            User user = (User) criteria.uniqueResult();

            if (user != null) {

                user.setVisitCount(user.getVisitCount() + 1);
                user.setLastLogin(LocalDateTime.now());

                session.update(user);

                message = "User \"" + user.getUserName() + "\" has Logged in Successfully.";

            }
        } catch (HibernateException e) {
            System.out.println(e);
        }

        return message;
    }

    public boolean checkCredentials(String name, String password) {
        Session session = sessionFactory.getCurrentSession();

        try {
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("userName", name));
            criteria.add(Restrictions.eq("password", password));
            User user = (User) criteria.uniqueResult();

            return user != null;
        } catch (HibernateException e) {
            System.out.println("error: " + e);
            return false;
        }
    }

}
