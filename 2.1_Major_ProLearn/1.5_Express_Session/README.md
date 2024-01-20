

[Express Session](https://expressjs.com/en/resources/middleware/session.html) <br>


----
Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.
Note The expires option should not be set directly; instead only use the maxAge option.
----
Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

Note Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.
----
**httpOnly:true,**
Specifies the boolean value for the HttpOnly Set-Cookie attribute. When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.

Note be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
----

